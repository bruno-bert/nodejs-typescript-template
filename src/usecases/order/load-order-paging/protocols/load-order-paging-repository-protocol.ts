import { OrderModel } from '@usecases'

export interface LoadOrderPagingRepositoryProtocol {
  loadPaging: () => Promise<LoadOrderPagingRepositoryProtocol.Result>
}

export namespace LoadOrderPagingRepositoryProtocol {
  export type Params = any
  export type Result = OrderModel[]
}
