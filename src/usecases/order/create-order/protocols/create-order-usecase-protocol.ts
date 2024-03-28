import {
  OrderModel,
  CreateOrderModel,
  CreateOrderRepositoryProtocol,
} from '@usecases'

export interface CreateOrderProtocol {
  map: (
    params: CreateOrderModel.Params,
  ) => Promise<CreateOrderRepositoryProtocol.Params>
  create: (
    params: CreateOrderModel.Params,
  ) => Promise<CreateOrderProtocol.Result>
}

export namespace CreateOrderProtocol {
  export type Result = OrderModel
}
