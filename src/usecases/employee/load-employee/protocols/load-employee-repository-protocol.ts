import { EmployeeModel } from '@usecases'

export interface LoadEmployeeRepositoryProtocol {
  loadAll: () => Promise<LoadEmployeeRepositoryProtocol.Result>
}

export namespace LoadEmployeeRepositoryProtocol {
  export type Result = EmployeeModel[]
}
