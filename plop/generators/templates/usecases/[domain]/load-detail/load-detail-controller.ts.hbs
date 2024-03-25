import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok, notFound } from '@presentation/helpers'
import { LoadDataDetailProtocol } from './protocols'
import { LoadDataDetailNotFoundError } from './errors'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadDataDetailController implements Controller {
  constructor(private readonly loadDataDetail: LoadDataDetailProtocol) {}

  async handle(
    request: LoadDataDetailController.Request,
  ): Promise<HttpResponse> {
    try {
      const id = request.id
      const data = await this.loadDataDetail.load(id)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      if (error instanceof LoadDataDetailNotFoundError) return notFound()
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadDataDetailController {
  export type Request = {
    id: string
  }
}
