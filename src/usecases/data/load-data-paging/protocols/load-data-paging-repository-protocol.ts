import { AnyDataModel } from '@usecases'

export interface LoadDataPagingRepositoryProtocol {
  loadPaging: () => Promise<LoadDataPagingRepositoryProtocol.Result>
}

export namespace LoadDataPagingRepositoryProtocol {
  export type Result = AnyDataModel[]
}
