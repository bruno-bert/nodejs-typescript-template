import {
  AnyDataModel,
  CreateDataModel,
  CreateDataRepositoryProtocol,
} from '@usecases'

export interface CreateDataProtocol {
  map: (
    params: CreateDataModel.Params,
  ) => Promise<CreateDataRepositoryProtocol.Params>
  create: (params: CreateDataModel.Params) => Promise<CreateDataProtocol.Result>
}

export namespace CreateDataProtocol {
  export type Result = AnyDataModel
}
