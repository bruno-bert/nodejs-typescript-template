import { OrderModel, EditOrderModel } from '@usecases'

export interface EditOrderRepositoryProtocol {
  edit: (
    id: string,
    params: EditOrderRepositoryProtocol.Params,
  ) => Promise<EditOrderRepositoryProtocol.Result>
}

export namespace EditOrderRepositoryProtocol {
  export type Result = OrderModel
  export type Params = EditOrderModel.Params
}
