import { SharkModel, CreateSharkModel } from '@usecases'

export interface CreateSharkRepositoryProtocol {
  create: (
    params: CreatSharkRepositoryProtocol.Params,
  ) => Promise<CreateSharkRepositoryProtocol.Result>
}

export namespace CreateSharkRepositoryProtocol {
  export type Result = SharkModel
  export type Params = CreateSharkModel.Params
}
