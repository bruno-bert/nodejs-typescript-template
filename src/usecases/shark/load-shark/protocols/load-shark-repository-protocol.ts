import { SharkModel } from '@usecases'

export interface LoadSharkRepositoryProtocol {
  loadAll: () => Promise<LoadSharkRepositoryProtocol.Result>
}

export namespace LoadSharkRepositoryProtocol {
  export type Result = SharkModel[]
}
