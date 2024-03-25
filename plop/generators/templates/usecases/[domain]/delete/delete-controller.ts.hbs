import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok, notFound } from '@presentation/helpers'
import { DeleteDataProtocol } from './protocols'
import { DeleteDataModel } from '@usecases'
import { DeleteDataNotFoundError } from './errors'
import { errorToHttpResponse } from '@utils/error-handler'

export class DeleteDataController implements Controller {
  constructor(private readonly deleteData: DeleteDataProtocol) {}

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
      const data = await this.deleteData.delete(params)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      if (error instanceof DeleteDataNotFoundError) return notFound()
      return errorToHttpResponse(error)
    }
  }
}

export namespace DeleteDataController {
  export type Request = {
    id: string
  }
}
