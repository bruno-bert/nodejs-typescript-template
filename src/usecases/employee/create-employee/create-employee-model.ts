import { EmployeeModel } from '@usecases'

export namespace CreateEmployeeModel {
  export type Params = Omit<EmployeeModel, 'id'>
}
