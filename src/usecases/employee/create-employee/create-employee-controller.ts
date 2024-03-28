import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { CreateEmployeeProtocol } from './protocols'
import { CreateEmployeeModel } from '@usecases'
import { errorToHttpResponse } from '@utils/error-handler'

export class CreateEmployeeController implements Controller {
  constructor(private readonly CreateEmployee: CreateEmployeeProtocol) {}

  async map({
    name,
    date,
    welcomeMessage,
  }: CreateEmployeeController.Request): Promise<CreateEmployeeModel.Params> {
    return { name, date, welcomeMessage }
  }

  async handle({
    name,
    date,
    welcomeMessage,
  }: CreateEmployeeController.Request): Promise<HttpResponse> {
    try {
      const params = await this.map({
        name,
        date,
        welcomeMessage,
      })

      const data = await this.CreateEmployee.create(params)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace CreateEmployeeController {
  /** This is the request received from the client */
  export type Request = {
    name: string
    date: Date
    welcomeMessage: string
  }
}
