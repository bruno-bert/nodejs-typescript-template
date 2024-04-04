import {
  SharkModel,
  CreateSharkModel,
  CreateSharkRepositoryProtocol,
} from '@usecases'

export interface CreateSharkProtocol {
  map: (
    params: CreateSharkModel.Params,
  ) => Promise<CreateSharkRepositoryProtocol.Params>
  create: (
    params: CreateSharkModel.Params,
  ) => Promise<CreateSharkProtocol.Result>
}

export namespace CreateSharkProtocol {
  export type Result = SharkModel
}
