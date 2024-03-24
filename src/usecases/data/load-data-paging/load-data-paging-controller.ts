import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { LoadDataPagingProtocol } from './protocols'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadDataPagingController implements Controller {
  constructor(private readonly loadDataPaging: LoadDataPagingProtocol) {}

  async handle(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: LoadDataPagingController.Request,
  ): Promise<HttpResponse> {
    try {
      const data = await this.loadDataPaging.loadPaging()
      return data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadDataPagingController {
  export type Request = {
    someParam: string
  }
}
