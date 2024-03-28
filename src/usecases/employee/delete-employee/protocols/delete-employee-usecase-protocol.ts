import {
  DeleteEmployeeModel,
  DeleteEmployeeRepositoryProtocol,
} from '@usecases'

export interface DeleteEmployeeProtocol {
  map: (
    params: DeleteEmployeeModel.Params,
  ) => Promise<DeleteEmployeeRepositoryProtocol.Params>
  delete: (
    params: DeleteEmployeeModel.Params,
  ) => Promise<DeleteEmployeeProtocol.Result>
}

export namespace DeleteEmployeeProtocol {
  export type Result = { success: boolean; count: number }
}
