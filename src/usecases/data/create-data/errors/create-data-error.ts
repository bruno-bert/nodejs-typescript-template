export class CreateDataError extends Error {
  constructor(error: string) {
    super(`Error on creating data: ${error}`)
    this.name = 'CreateDataError'
  }
}
