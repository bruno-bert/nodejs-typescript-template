import { OrderModel } from '@usecases'

export interface LoadOrderDetailProtocol {
  load: (id: string) => Promise<LoadOrderDetailProtocol.Result>
}

export namespace LoadOrderDetailProtocol {
  export type Result = OrderModel
}
