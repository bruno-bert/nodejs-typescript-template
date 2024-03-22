export class CreateDataError extends Error {
  constructor(error: string) {
    super(`Error on creating data: ${error}`)
    this.name = 'CreateDataError'
  }
}

export class DatabaseCreateDataError extends Error {
  constructor(error: string) {
    super(`Error on creating data in database: ${error}`)
    this.name = 'DatabaseCreateDataError'
  }
}
