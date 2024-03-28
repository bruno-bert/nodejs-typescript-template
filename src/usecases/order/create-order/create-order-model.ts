import { OrderModel } from '@usecases'

export namespace CreateOrderModel {
  export type Params = Omit<OrderModel, 'id'>
}
