import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { LoadEmployeePagingProtocol } from './protocols'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadEmployeePagingController implements Controller {
  constructor(
    private readonly LoadEmployeePaging: LoadEmployeePagingProtocol,
  ) {}

  async handle(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: LoadEmployeePagingController.Request,
  ): Promise<HttpResponse> {
    try {
      const data = await this.LoadEmployeePaging.loadPaging()
      return data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadEmployeePagingController {
  export type Request = Record<string, never>
}
