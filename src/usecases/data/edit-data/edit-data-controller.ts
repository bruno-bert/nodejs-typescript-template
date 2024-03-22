import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, serverError, ok } from '@presentation/helpers'
import { EditDataProtocol } from './protocols'
import { EditDataModel } from '@usecases'

export class EditDataController implements Controller {
  constructor(private readonly editData: EditDataProtocol) {}

  async map({
    id,
    name,
    welcomeMessage,
    date,
  }: EditDataController.Request): Promise<EditDataModel.Params> {
    return { id, name, welcomeMessage, date }
  }

  async handle({
    id,
    name,
    welcomeMessage,
    date,
  }: EditDataController.Request): Promise<HttpResponse> {
    try {
      const params = await this.map({
        id,
        name,
        welcomeMessage,
        date,
      })

      const data = await this.editData.edit(id, params)
      return data ? ok(data) : noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace EditDataController {
  export type Request = {
    id: string
    name: string
    welcomeMessage: string
    date: Date
  }
}
