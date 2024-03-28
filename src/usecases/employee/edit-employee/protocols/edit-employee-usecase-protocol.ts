import { EmployeeModel, EditEmployeeModel } from '@usecases'

export interface EditEmployeeProtocol {
  edit: (
    id: string,
    params: EditEmployeeModel.Params,
  ) => Promise<EditEmployeeProtocol.Result>
}

export namespace EditEmployeeProtocol {
  export type Result = EmployeeModel
}
