import { SharkModel } from '@usecases'

export interface LoadSharkDetailProtocol {
  load: (id: string) => Promise<LoadSharkDetailProtocol.Result>
}

export namespace LoadSharkDetailProtocol {
  export type Result = SharkModel
}
