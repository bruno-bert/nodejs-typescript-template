import { OrderModel } from '@usecases'

export type DeleteOrderModel = OrderModel

export namespace DeleteOrderModel {
  export type Params = { id: string }
}
