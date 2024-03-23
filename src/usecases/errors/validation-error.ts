export class ValidationError extends Error {
  constructor(error: string) {
    super(`Error on validation: ${error}`)
    this.name = 'ValidationError'
  }
}
