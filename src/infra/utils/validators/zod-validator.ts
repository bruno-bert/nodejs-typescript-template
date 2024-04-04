/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidatorProtocol } from '@utils'
import { jsonSchemaToZod } from 'json-schema-to-zod'

import { SafeParseReturnType, ZodError, boolean, string } from 'zod'
import { resolveRefs } from 'json-refs'
import { format } from 'prettier'
import { ValidationError } from '@usecases'

export class ZodValidator implements ValidatorProtocol<any> {
  map(parseResult: {
    success: boolean
    error?: ZodError
  }): ValidatorProtocol.Result {
    if (parseResult.success) {
      return {
        success: true,
        messages: [],
      }
    } else {
      return {
        success: false,
        originalMessage: parseResult.error?.message,
        messages: parseResult.error?.errors.map((zodError) => {
          return {
            type: 'error',
            message: zodError.message,
            code: zodError.code,
            field: zodError.path.join('|'),
          }
        }),
      }
    }
  }

  async validate(
    schema: object,
    values: any,
  ): Promise<ValidatorProtocol.Result> {
    const { resolved } = await resolveRefs(schema)
    const code = jsonSchemaToZod(resolved, { module: 'cjs' })
    const formatted = await format(code, { parser: 'typescript' })
    // eslint-disable-next-line no-eval
    const zodSchema = eval(formatted)
    const parseResult: SafeParseReturnType<any, any> =
      zodSchema.safeParse(values)

    const result = this.map(parseResult)

    return result
  }
}
