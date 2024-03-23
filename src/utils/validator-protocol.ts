import { ValidationError } from '@usecases'
import { GenericValidator } from './generic-validator'

export interface ValidatorProtocol<T> extends GenericValidator {
  validate: (
    params: ValidatorProtocol.Params<T>,
  ) => Promise<ValidatorProtocol.Result>
}

export namespace ValidatorProtocol {
  export type Result = {
    success: boolean
    messages?: {
      type: 'error' | 'warning' | 'info' | 'success'
      message: string
      errorType: ValidationError
    }[]
  }
  export type Params<T> = T
}
