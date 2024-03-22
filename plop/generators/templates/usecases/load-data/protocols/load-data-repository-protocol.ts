import { AnyDataModel } from '@usecases'

export interface LoadDataRepositoryProtocol {
  loadAll: () => Promise<LoadDataRepositoryProtocol.Result>
}

export namespace LoadDataRepositoryProtocol {
  export type Result = AnyDataModel[]
}
