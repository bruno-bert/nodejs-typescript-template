import { EmployeeModel, EditEmployeeModel } from '@usecases'

export interface EditEmployeeRepositoryProtocol {
  edit: (
    id: string,
    params: EditEmployeeRepositoryProtocol.Params,
  ) => Promise<EditEmployeeRepositoryProtocol.Result>
}

export namespace EditEmployeeRepositoryProtocol {
  export type Result = EmployeeModel
  export type Params = EditEmployeeModel.Params
}
