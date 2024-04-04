import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok, notFound } from '@presentation/helpers'
import { EditSharkProtocol } from './protocols'
import { EditSharkModel } from '@usecases'
import { EditSharkNotFoundError } from './errors'
import { errorToHttpResponse } from '@utils/error-handler'

export class EditSharkController implements Controller {
  constructor(private readonly EditShark: EditSharkProtocol) {}

  async map({
    id,
    name,
    date,
    welcomeMessage,
  }: EditSharkController.Request): Promise<EditSharkModel.Params> {
    return { id, name, date: new Date(date), welcomeMessage }
  }

  async handle({
    id,
    name,
    date,
    welcomeMessage,
  }: EditSharkController.Request): Promise<HttpResponse> {
    try {
      const params = await this.map({
        id,
        name,
        date,
        welcomeMessage,
      })

      const data = await this.EditShark.edit(id, params)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      if (error instanceof EditSharkNotFoundError) return notFound()
      return errorToHttpResponse(error)
    }
  }
}

export namespace EditSharkController {
  export type Request = {
    id: string
    name: string
    date: string
    welcomeMessage: string
  }
}
