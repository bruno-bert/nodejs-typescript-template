import { EmployeeModel } from '@usecases'

export interface LoadEmployeePagingRepositoryProtocol {
  loadPaging: () => Promise<LoadEmployeePagingRepositoryProtocol.Result>
}

export namespace LoadEmployeePagingRepositoryProtocol {
  export type Params = any
  export type Result = EmployeeModel[]
}
