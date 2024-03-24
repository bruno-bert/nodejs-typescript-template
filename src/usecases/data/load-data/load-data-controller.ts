import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { LoadDataProtocol } from './protocols'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadDataController implements Controller {
  constructor(private readonly loadData: LoadDataProtocol) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(request: LoadDataController.Request): Promise<HttpResponse> {
    try {
      const data = await this.loadData.load()
      return data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadDataController {
  export type Request = {
    accountId: string
  }
}
