import { Controller, HttpResponse } from '@presentation/protocols'
import { LogErrorRepository } from './log-decorator-service'

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository,
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      console.log(httpResponse.body.stack)
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
