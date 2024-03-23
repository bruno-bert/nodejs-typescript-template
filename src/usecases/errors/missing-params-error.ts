import { ValidationError } from './validation-error'

export class MissingParamsDataError extends ValidationError {
  constructor(error: string) {
    super(`Error on validation: ${error}`)
    this.name = 'MissingParamsDataError'
  }
}
