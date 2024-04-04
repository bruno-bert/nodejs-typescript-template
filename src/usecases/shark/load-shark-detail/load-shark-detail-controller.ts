import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok, notFound } from '@presentation/helpers'
import { LoadSharkDetailProtocol } from './protocols'
import { LoadSharkDetailNotFoundError } from './errors'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadSharkDetailController implements Controller {
  constructor(private readonly LoadSharkDetail: LoadSharkDetailProtocol) {}

  async handle(
    request: LoadSharkDetailController.Request,
  ): Promise<HttpResponse> {
    try {
      const id = request.id
      const data = await this.LoadSharkDetail.load(id)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      if (error instanceof LoadSharkDetailNotFoundError) return notFound()
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadSharkDetailController {
  export type Request = {
    id: string
  }
}
