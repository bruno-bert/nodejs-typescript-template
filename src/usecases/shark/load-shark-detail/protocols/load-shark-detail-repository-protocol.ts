import { SharkModel } from '@usecases'

export interface LoadSharkDetailRepositoryProtocol {
  loadById: (id: string) => Promise<LoadSharkDetailRepositoryProtocol.Result>
}

export namespace LoadSharkDetailRepositoryProtocol {
  export type Params = { id: string }
  export type Result = SharkModel
}
