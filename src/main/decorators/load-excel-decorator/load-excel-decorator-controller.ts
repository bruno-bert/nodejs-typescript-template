import { Controller, HttpResponse } from '@presentation/protocols'
import { ExcelDecoratorProtocol } from './load-excel-decorator-service-protocol'

export class ExcelGeneratorController implements Controller {
  constructor(
    private controller: Controller,
    private decorator: ExcelDecoratorProtocol,
  ) {}

  async handle(request: any, response: any): Promise<HttpResponse> {
    const data = await this.controller.handle(request)
    const printableColumns = request.printableColumns
    const filename = 'data'
    const res = await this.decorator.fetch(
      response,
      data?.body?.data,
      filename,
      printableColumns,
    )

    return res
  }
}
