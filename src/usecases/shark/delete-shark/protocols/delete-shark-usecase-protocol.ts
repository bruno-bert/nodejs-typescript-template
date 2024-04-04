import { DeleteSharkModel, DeleteSharkRepositoryProtocol } from '@usecases'

export interface DeleteSharkProtocol {
  map: (
    params: DeleteSharkModel.Params,
  ) => Promise<DeleteSharkRepositoryProtocol.Params>
  delete: (
    params: DeleteSharkModel.Params,
  ) => Promise<DeleteSharkProtocol.Result>
}

export namespace DeleteSharkProtocol {
  export type Result = { success: boolean; count: number }
}
