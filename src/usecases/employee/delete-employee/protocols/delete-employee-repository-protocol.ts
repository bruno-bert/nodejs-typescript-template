import { DeleteEmployeeModel } from '@usecases'

export interface DeleteEmployeeRepositoryProtocol {
  delete: (
    params: DeleteEmployeeRepositoryProtocol.Params,
  ) => Promise<DeleteEmployeeRepositoryProtocol.Result>
}

export namespace DeleteEmployeeRepositoryProtocol {
  export type Result = { success: boolean; count: number }
  export type Params = DeleteEmployeeModel.Params
}
