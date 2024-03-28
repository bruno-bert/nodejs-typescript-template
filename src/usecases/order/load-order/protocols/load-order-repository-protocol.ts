import { OrderModel } from '@usecases'

export interface LoadOrderRepositoryProtocol {
  loadAll: () => Promise<LoadOrderRepositoryProtocol.Result>
}

export namespace LoadOrderRepositoryProtocol {
  export type Result = OrderModel[]
}
