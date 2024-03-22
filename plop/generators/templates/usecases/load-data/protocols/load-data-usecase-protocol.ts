import { AnyDataModel } from '@usecases'

export interface LoadDataProtocol {
  load: () => Promise<LoadDataProtocol.Result>
}

export namespace LoadDataProtocol {
  export type Result = AnyDataModel[]
}
