import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, serverError, ok } from '@presentation/helpers'
import { LoadDataPagingProtocol } from './protocols'

export class LoadDataPagingController implements Controller {
  constructor(private readonly loadDataPaging: LoadDataPagingProtocol) {}

  async handle(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: LoadDataPagingController.Request,
  ): Promise<HttpResponse> {
    try {
      const data = await this.loadDataPaging.loadPaging()
      return data.length ? ok(data) : noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace LoadDataPagingController {
  export type Request = {
    someParam: string
  }
}
