import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { LoadOrderPagingProtocol } from './protocols'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadOrderPagingController implements Controller {
  constructor(private readonly LoadOrderPaging: LoadOrderPagingProtocol) {}

  async handle(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: LoadOrderPagingController.Request,
  ): Promise<HttpResponse> {
    try {
      const data = await this.LoadOrderPaging.loadPaging()
      return data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadOrderPagingController {
  export type Request = Record<string, never>
}
