import { AnyDataModel, EditDataModel } from '@usecases'

export interface EditDataRepositoryProtocol {
  edit: (
    id: string,
    params: EditDataRepositoryProtocol.Params,
  ) => Promise<EditDataRepositoryProtocol.Result>
}

export namespace EditDataRepositoryProtocol {
  export type Result = AnyDataModel
  export type Params = EditDataModel.Params
}
