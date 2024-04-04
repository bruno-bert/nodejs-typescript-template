import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok, notFound } from '@presentation/helpers'
import { DeleteSharkProtocol } from './protocols'
import { DeleteSharkModel } from '@usecases'
import { DeleteSharkNotFoundError } from './errors'
import { errorToHttpResponse } from '@utils/error-handler'

export class DeleteSharkController implements Controller {
  constructor(private readonly DeleteShark: DeleteSharkProtocol) {}

  async map({
    id,
  }: DeleteSharkController.Request): Promise<DeleteSharkModel.Params> {
    return { id }
  }

  async handle(request: DeleteSharkController.Request): Promise<HttpResponse> {
    try {
      const id = request.id
      const params = await this.map({
        id,
      })
      const data = await this.DeleteShark.delete(params)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      if (error instanceof DeleteSharkNotFoundError) return notFound()
      return errorToHttpResponse(error)
    }
  }
}

export namespace DeleteSharkController {
  export type Request = {
    id: string
  }
}
