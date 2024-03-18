import { AnyDataModel } from '@usecases'

export interface LoadDataDetailProtocol {
  load: (id: string) => Promise<LoadDataDetailProtocol.Result>
}

export namespace LoadDataDetailProtocol {
  export type Result = AnyDataModel[]
}
