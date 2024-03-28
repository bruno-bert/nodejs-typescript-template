import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok, notFound } from '@presentation/helpers'
import { LoadOrderDetailProtocol } from './protocols'
import { LoadOrderDetailNotFoundError } from './errors'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadOrderDetailController implements Controller {
  constructor(private readonly LoadOrderDetail: LoadOrderDetailProtocol) {}

  async handle(
    request: LoadOrderDetailController.Request,
  ): Promise<HttpResponse> {
    try {
      const id = request.id
      const data = await this.LoadOrderDetail.load(id)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      if (error instanceof LoadOrderDetailNotFoundError) return notFound()
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadOrderDetailController {
  export type Request = {
    id: string
  }
}
