import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, serverError, ok } from '@presentation/helpers'
import { LoadDataDetailProtocol } from './protocols'

export class LoadDataDetailController implements Controller {
  constructor(private readonly loadDataDetail: LoadDataDetailProtocol) {}

  async handle(
    request: LoadDataDetailController.Request,
  ): Promise<HttpResponse> {
    try {
      const id = request.id
      const data = await this.loadDataDetail.load(id)
      return data ? ok(data) : noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace LoadDataDetailController {
  export type Request = {
    id: string
  }
}
