import { SharkModel } from '@usecases'

export namespace CreateSharkModel {
  export type Params = Omit<SharkModel, 'id'>
}
