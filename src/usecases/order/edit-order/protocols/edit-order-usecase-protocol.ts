import { OrderModel, EditOrderModel } from '@usecases'

export interface EditOrderProtocol {
  edit: (
    id: string,
    params: EditOrderModel.Params,
  ) => Promise<EditOrderProtocol.Result>
}

export namespace EditOrderProtocol {
  export type Result = OrderModel
}
