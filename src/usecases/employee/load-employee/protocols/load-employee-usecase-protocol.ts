import { EmployeeModel } from '@usecases'

export interface LoadEmployeeProtocol {
  load: () => Promise<LoadEmployeeProtocol.Result>
}

export namespace LoadEmployeeProtocol {
  export type Result = EmployeeModel[]
}
