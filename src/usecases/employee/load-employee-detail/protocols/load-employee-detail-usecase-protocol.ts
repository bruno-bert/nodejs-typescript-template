import { EmployeeModel } from '@usecases'

export interface LoadEmployeeDetailProtocol {
  load: (id: string) => Promise<LoadEmployeeDetailProtocol.Result>
}

export namespace LoadEmployeeDetailProtocol {
  export type Result = EmployeeModel
}
