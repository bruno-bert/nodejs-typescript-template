import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { LoadSharkProtocol } from './protocols'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadSharkController implements Controller {
  constructor(private readonly LoadShark: LoadSharkProtocol) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(request: LoadSharkController.Request): Promise<HttpResponse> {
    try {
      const data = await this.LoadShark.load()
      return data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadSharkController {
  export type Request = Record<string, never>
}
