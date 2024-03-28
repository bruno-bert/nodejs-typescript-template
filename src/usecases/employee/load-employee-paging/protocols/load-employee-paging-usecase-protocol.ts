import { EmployeeModel } from '@usecases'

export interface LoadEmployeePagingProtocol {
  loadPaging: () => Promise<LoadEmployeePagingProtocol.Result>
}

export namespace LoadEmployeePagingProtocol {
  export type Result = EmployeeModel[]
}
