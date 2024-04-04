import { SharkModel, EditSharkModel } from '@usecases'

export interface EditSharkProtocol {
  edit: (
    id: string,
    params: EditSharkModel.Params,
  ) => Promise<EditSharkProtocol.Result>
}

export namespace EditSharkProtocol {
  export type Result = SharkModel
}
