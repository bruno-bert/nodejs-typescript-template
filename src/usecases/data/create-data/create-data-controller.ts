import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, serverError, ok, badRequest } from '@presentation/helpers'
import { CreateDataProtocol } from './protocols'
import { CreateDataModel, MissingParamsError } from '@usecases'

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
    } catch (error: unknown) {
      if (error instanceof MissingParamsError) return badRequest(error)
      return serverError(error as Error)
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
