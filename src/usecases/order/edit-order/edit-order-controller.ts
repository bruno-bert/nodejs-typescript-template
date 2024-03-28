import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok, notFound } from '@presentation/helpers'
import { EditOrderProtocol } from './protocols'
import { EditOrderModel } from '@usecases'
import { EditOrderNotFoundError } from './errors'
import { errorToHttpResponse } from '@utils/error-handler'

export class EditOrderController implements Controller {
  constructor(private readonly EditOrder: EditOrderProtocol) {}

  async map({
    id,
    orderId,
    manufacturerId,
    purchaseDate,
    productId,
  }: EditOrderController.Request): Promise<EditOrderModel.Params> {
    return { id, orderId, manufacturerId, purchaseDate, productId }
  }

  async handle({
    id,
    orderId,
    manufacturerId,
    purchaseDate,
    productId,
  }: EditOrderController.Request): Promise<HttpResponse> {
    try {
      const params = await this.map({
        id,
        orderId,
        manufacturerId,
        purchaseDate,
        productId,
      })

      const data = await this.EditOrder.edit(id, params)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      if (error instanceof EditOrderNotFoundError) return notFound()
      return errorToHttpResponse(error)
    }
  }
}

export namespace EditOrderController {
  export type Request = {
    id: string
    orderId: string
    manufacturerId: string
    purchaseDate: Date
    productId: string
  }
}
