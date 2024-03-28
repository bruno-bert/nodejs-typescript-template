import { EmployeeModel, CreateEmployeeModel } from '@usecases'

export interface CreateEmployeeRepositoryProtocol {
  create: (
    params: CreatEmployeeRepositoryProtocol.Params,
  ) => Promise<CreateEmployeeRepositoryProtocol.Result>
}

export namespace CreateEmployeeRepositoryProtocol {
  export type Result = EmployeeModel
  export type Params = CreateEmployeeModel.Params
}
