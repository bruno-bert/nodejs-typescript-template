import {
  EmployeeModel,
  CreateEmployeeModel,
  CreateEmployeeRepositoryProtocol,
} from '@usecases'

export interface CreateEmployeeProtocol {
  map: (
    params: CreateEmployeeModel.Params,
  ) => Promise<CreateEmployeeRepositoryProtocol.Params>
  create: (
    params: CreateEmployeeModel.Params,
  ) => Promise<CreateEmployeeProtocol.Result>
}

export namespace CreateEmployeeProtocol {
  export type Result = EmployeeModel
}
