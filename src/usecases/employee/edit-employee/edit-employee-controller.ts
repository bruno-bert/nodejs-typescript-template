import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok, notFound } from '@presentation/helpers'
import { EditEmployeeProtocol } from './protocols'
import { EditEmployeeModel } from '@usecases'
import { EditEmployeeNotFoundError } from './errors'
import { errorToHttpResponse } from '@utils/error-handler'

export class EditEmployeeController implements Controller {
  constructor(private readonly EditEmployee: EditEmployeeProtocol) {}

  async map({
    id,
    name,
    date,
    welcomeMessage,
  }: EditEmployeeController.Request): Promise<EditEmployeeModel.Params> {
    return { id, name, date, welcomeMessage }
  }

  async handle({
    id,
    name,
    date,
    welcomeMessage,
  }: EditEmployeeController.Request): Promise<HttpResponse> {
    try {
      const params = await this.map({
        id,
        name,
        date,
        welcomeMessage,
      })

      const data = await this.EditEmployee.edit(id, params)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      if (error instanceof EditEmployeeNotFoundError) return notFound()
      return errorToHttpResponse(error)
    }
  }
}

export namespace EditEmployeeController {
  export type Request = {
    id: string
    name: string
    date: Date
    welcomeMessage: string
  }
}
