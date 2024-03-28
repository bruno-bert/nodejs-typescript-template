import { EmployeeModel } from '@usecases'

export type DeleteEmployeeModel = EmployeeModel

export namespace DeleteEmployeeModel {
  export type Params = { id: string }
}
