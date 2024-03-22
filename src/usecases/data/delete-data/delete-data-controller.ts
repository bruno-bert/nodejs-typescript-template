import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, serverError, ok } from '@presentation/helpers'
import { DeleteDataProtocol } from './protocols'
import { DeleteDataModel } from '@usecases'

export class DeleteDataController implements Controller {
  constructor(private readonly DeleteData: DeleteDataProtocol) {}

  async map({
    id,
  }: DeleteDataController.Request): Promise<DeleteDataModel.Params> {
    return { id }
  }

  async handle(request: DeleteDataController.Request): Promise<HttpResponse> {
    try {
      const id = request.id
      const params = await this.map({
        id,
      })
      const data = await this.DeleteData.delete(params)
      return data ? ok(data) : noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace DeleteDataController {
  export type Request = {
    id: string
  }
}
