import { AnyDataModel } from '@usecases'

export namespace CreateDataModel {
  export type Params = Omit<AnyDataModel, 'id'>
}
