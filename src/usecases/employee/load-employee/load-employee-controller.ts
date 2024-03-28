import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { LoadEmployeeProtocol } from './protocols'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadEmployeeController implements Controller {
  constructor(private readonly LoadEmployee: LoadEmployeeProtocol) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(request: LoadEmployeeController.Request): Promise<HttpResponse> {
    try {
      const data = await this.LoadEmployee.load()
      return data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadEmployeeController {
  export type Request = Record<string, never>
}
