import { AnyDataModel } from '@usecases'

export interface LoadDataDetailRepositoryProtocol {
  loadById: (id: string) => Promise<LoadDataDetailRepositoryProtocol.Result>
}

export namespace LoadDataDetailRepositoryProtocol {
  export type Result = AnyDataModel
}
