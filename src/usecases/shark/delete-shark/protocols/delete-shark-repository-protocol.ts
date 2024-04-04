import { DeleteSharkModel } from '@usecases'

export interface DeleteSharkRepositoryProtocol {
  delete: (
    params: DeleteSharkRepositoryProtocol.Params,
  ) => Promise<DeleteSharkRepositoryProtocol.Result>
}

export namespace DeleteSharkRepositoryProtocol {
  export type Result = { success: boolean; count: number }
  export type Params = DeleteSharkModel.Params
}
