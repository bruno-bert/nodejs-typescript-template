import { OrderModel } from '@usecases'

export interface LoadOrderDetailRepositoryProtocol {
  loadById: (id: string) => Promise<LoadOrderDetailRepositoryProtocol.Result>
}

export namespace LoadOrderDetailRepositoryProtocol {
  export type Params = { id: string }
  export type Result = OrderModel
}
