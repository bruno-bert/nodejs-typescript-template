import { OrderModel } from '@usecases'

export interface LoadOrderProtocol {
  load: () => Promise<LoadOrderProtocol.Result>
}

export namespace LoadOrderProtocol {
  export type Result = OrderModel[]
}
