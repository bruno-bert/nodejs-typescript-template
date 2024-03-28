import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok, notFound } from '@presentation/helpers'
import { DeleteOrderProtocol } from './protocols'
import { DeleteOrderModel } from '@usecases'
import { DeleteOrderNotFoundError } from './errors'
import { errorToHttpResponse } from '@utils/error-handler'

export class DeleteOrderController implements Controller {
  constructor(private readonly DeleteOrder: DeleteOrderProtocol) {}

  async map({
    id,
  }: DeleteOrderController.Request): Promise<DeleteOrderModel.Params> {
    return { id }
  }

  async handle(request: DeleteOrderController.Request): Promise<HttpResponse> {
    try {
      const id = request.id
      const params = await this.map({
        id,
      })
      const data = await this.DeleteOrder.delete(params)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      if (error instanceof DeleteOrderNotFoundError) return notFound()
      return errorToHttpResponse(error)
    }
  }
}

export namespace DeleteOrderController {
  export type Request = {
    id: string
  }
}
