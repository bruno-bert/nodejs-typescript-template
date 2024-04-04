import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { CreateSharkProtocol } from './protocols'
import { CreateSharkModel } from '@usecases'
import { errorToHttpResponse } from '@utils/error-handler'

export class CreateSharkController implements Controller {
  constructor(private readonly CreateShark: CreateSharkProtocol) {}

  async map({
    name,
    date,
    welcomeMessage,
  }: CreateSharkController.Request): Promise<CreateSharkModel.Params> {
    return { name, date: new Date(date), welcomeMessage }
  }

  async handle({
    name,
    date,
    welcomeMessage,
  }: CreateSharkController.Request): Promise<HttpResponse> {
    try {
      const params = await this.map({
        name,
        date,
        welcomeMessage,
      })

      const data = await this.CreateShark.create(params)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace CreateSharkController {
  /** This is the request received from the client */
  export type Request = {
    name: string
    date: string
    welcomeMessage: string
  }
}
