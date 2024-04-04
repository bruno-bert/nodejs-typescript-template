export class CreateSharkError extends Error {
  constructor(error: string) {
    super(`Error on creating shark: ${error}`)
    this.name = 'CreateSharkError'
  }
}

export class DatabaseCreateSharkError extends Error {
  constructor(error: string) {
    super(`Error on creating shark in database: ${error}`)
    this.name = 'DatabaseCreateSharkError'
  }
}
