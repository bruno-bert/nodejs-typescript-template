import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok, notFound } from '@presentation/helpers'
import { LoadEmployeeDetailProtocol } from './protocols'
import { LoadEmployeeDetailNotFoundError } from './errors'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadEmployeeDetailController implements Controller {
  constructor(
    private readonly LoadEmployeeDetail: LoadEmployeeDetailProtocol,
  ) {}

  async handle(
    request: LoadEmployeeDetailController.Request,
  ): Promise<HttpResponse> {
    try {
      const id = request.id
      const data = await this.LoadEmployeeDetail.load(id)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      if (error instanceof LoadEmployeeDetailNotFoundError) return notFound()
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadEmployeeDetailController {
  export type Request = {
    id: string
  }
}
