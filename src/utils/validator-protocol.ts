import { GenericValidator } from './generic-validator'

export interface ValidatorProtocol<T> extends GenericValidator {
  validate: (
    schema: object,
    values: ValidatorProtocol.Params<T>,
  ) => Promise<ValidatorProtocol.Result>
}

export namespace ValidatorProtocol {
  export type Result = {
    success: boolean
    originalMessage?: string
    messages?: {
      type: 'error' | 'warning' | 'info' | 'success'
      message: string
      code: string
      field: string
    }[]
  }
  export type Params<T> = T
}
