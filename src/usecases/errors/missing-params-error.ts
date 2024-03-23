import { ValidationError } from './validation-error'

export class MissingParamsError extends ValidationError {
  constructor(error: string) {
    super(`Error on validation: ${error}`)
    this.name = 'MissingParamsDataError'
  }
}
