import { AnyDataModel } from '@usecases'

export interface LoadDataPagingRepositoryProtocol {
  loadPaging: () => Promise<LoadDataPagingRepositoryProtocol.Result>
}

export namespace LoadDataPagingRepositoryProtocol {
  export type Params = any
  export type Result = AnyDataModel[]
}
