import { Controller, HttpResponse } from '@presentation/protocols'

import { ok, noContent } from '@presentation/helpers'
import { CsvDecoratorProtocol } from './load-csv-decorator-service-protocol'
import { Transform } from 'stream'

export class CsvGeneratorController implements Controller {
  constructor(
    private controller: Controller,
    private decorator: CsvDecoratorProtocol,
  ) {}

  async handle(request: any, response: any): Promise<HttpResponse> {
    const data = await this.controller.handle(request)

    const csv: Transform = (await this.decorator.fetch(data?.body?.data)).pipe(
      response,
    )
    const filename = 'data'
    response.setHeader('Content-Type', 'text/csv')
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}.csv`,
    )

    return data ? ok(csv) : noContent()
  }
}
