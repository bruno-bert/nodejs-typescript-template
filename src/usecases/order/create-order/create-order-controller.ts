import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { CreateOrderProtocol } from './protocols'
import { CreateOrderModel } from '@usecases'
import { errorToHttpResponse } from '@utils/error-handler'

export class CreateOrderController implements Controller {
  constructor(private readonly CreateOrder: CreateOrderProtocol) {}

  async map({
    orderId,
    manufacturerId,
    purchaseDate,
    productId,
  }: CreateOrderController.Request): Promise<CreateOrderModel.Params> {
    return { orderId, manufacturerId, purchaseDate, productId }
  }

  async handle({
    orderId,
    manufacturerId,
    purchaseDate,
    productId,
  }: CreateOrderController.Request): Promise<HttpResponse> {
    try {
      const params = await this.map({
        orderId,
        manufacturerId,
        purchaseDate,
        productId,
      })

      const data = await this.CreateOrder.create(params)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace CreateOrderController {
  /** This is the request received from the client */
  export type Request = {
    orderId: string
    manufacturerId: string
    purchaseDate: Date
    productId: string
  }
}
