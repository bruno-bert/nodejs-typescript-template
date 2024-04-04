import { SharkModel, EditSharkModel } from '@usecases'

export interface EditSharkRepositoryProtocol {
  edit: (
    id: string,
    params: EditSharkRepositoryProtocol.Params,
  ) => Promise<EditSharkRepositoryProtocol.Result>
}

export namespace EditSharkRepositoryProtocol {
  export type Result = SharkModel
  export type Params = EditSharkModel.Params
}
