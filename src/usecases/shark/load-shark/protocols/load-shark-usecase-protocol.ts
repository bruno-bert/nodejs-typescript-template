import { SharkModel } from '@usecases'

export interface LoadSharkProtocol {
  load: () => Promise<LoadSharkProtocol.Result>
}

export namespace LoadSharkProtocol {
  export type Result = SharkModel[]
}
