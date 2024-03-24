import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { CreateDataProtocol } from './protocols'
import { CreateDataModel } from '@usecases'
import { errorToHttpResponse } from '@utils/error-handler'

export class CreateDataController implements Controller {
  constructor(private readonly createData: CreateDataProtocol) {}

  async map({
    name,
    welcomeMessage,
    date,
  }: CreateDataController.Request): Promise<CreateDataModel.Params> {
    return { name, welcomeMessage, date }
  }

  async handle({
    name,
    welcomeMessage,
    date,
  }: CreateDataController.Request): Promise<HttpResponse> {
    try {
      const params = await this.map({
        name,
        welcomeMessage,
        date,
      })

      const data = await this.createData.create(params)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace CreateDataController {
  /** This is the request received from the client */
  export type Request = {
    name: string
    welcomeMessage: string
    date: Date
  }
}
