import { DeleteOrderModel, DeleteOrderRepositoryProtocol } from '@usecases'

export interface DeleteOrderProtocol {
  map: (
    params: DeleteOrderModel.Params,
  ) => Promise<DeleteOrderRepositoryProtocol.Params>
  delete: (
    params: DeleteOrderModel.Params,
  ) => Promise<DeleteOrderProtocol.Result>
}

export namespace DeleteOrderProtocol {
  export type Result = { success: boolean; count: number }
}
