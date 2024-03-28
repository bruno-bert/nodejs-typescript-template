import { DeleteOrderModel } from '@usecases'

export interface DeleteOrderRepositoryProtocol {
  delete: (
    params: DeleteOrderRepositoryProtocol.Params,
  ) => Promise<DeleteOrderRepositoryProtocol.Result>
}

export namespace DeleteOrderRepositoryProtocol {
  export type Result = { success: boolean; count: number }
  export type Params = DeleteOrderModel.Params
}
