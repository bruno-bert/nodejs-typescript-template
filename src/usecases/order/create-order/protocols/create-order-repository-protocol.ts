import { OrderModel, CreateOrderModel } from '@usecases'

export interface CreateOrderRepositoryProtocol {
  create: (
    params: CreatOrderRepositoryProtocol.Params,
  ) => Promise<CreateOrderRepositoryProtocol.Result>
}

export namespace CreateOrderRepositoryProtocol {
  export type Result = OrderModel
  export type Params = CreateOrderModel.Params
}
