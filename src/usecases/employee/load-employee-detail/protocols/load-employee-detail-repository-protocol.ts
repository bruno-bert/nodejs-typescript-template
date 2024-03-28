import { EmployeeModel } from '@usecases'

export interface LoadEmployeeDetailRepositoryProtocol {
  loadById: (id: string) => Promise<LoadEmployeeDetailRepositoryProtocol.Result>
}

export namespace LoadEmployeeDetailRepositoryProtocol {
  export type Params = { id: string }
  export type Result = EmployeeModel
}
