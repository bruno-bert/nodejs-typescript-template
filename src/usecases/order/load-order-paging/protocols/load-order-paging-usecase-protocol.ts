import { OrderModel } from '@usecases'

export interface LoadOrderPagingProtocol {
  loadPaging: () => Promise<LoadOrderPagingProtocol.Result>
}

export namespace LoadOrderPagingProtocol {
  export type Result = OrderModel[]
}
