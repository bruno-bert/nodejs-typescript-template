import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, serverError, ok } from '@presentation/helpers'
import { LoadDataProtocol } from './protocols'

export class LoadDataController implements Controller {
  constructor(private readonly loadData: LoadDataProtocol) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(request: LoadDataController.Request): Promise<HttpResponse> {
    try {
      const data = await this.loadData.load()
      return data.length ? ok(data) : noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace LoadDataController {
  export type Request = {
    accountId: string
  }
}
