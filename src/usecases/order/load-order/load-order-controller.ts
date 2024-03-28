import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { LoadOrderProtocol } from './protocols'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadOrderController implements Controller {
  constructor(private readonly LoadOrder: LoadOrderProtocol) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(request: LoadOrderController.Request): Promise<HttpResponse> {
    try {
      const data = await this.LoadOrder.load()
      return data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadOrderController {
  export type Request = Record<string, never>
}
