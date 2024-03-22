import { AnyDataModel, CreateDataModel } from '@usecases'

export interface CreateDataRepositoryProtocol {
  create: (
    params: CreateDataRepositoryProtocol.Params,
  ) => Promise<CreateDataRepositoryProtocol.Result>
}

export namespace CreateDataRepositoryProtocol {
  export type Result = AnyDataModel
  export type Params = CreateDataModel.Params
}
