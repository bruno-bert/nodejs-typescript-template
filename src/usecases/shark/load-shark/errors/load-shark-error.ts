export class LoadSharkError extends Error {
  constructor(error: string) {
    super(`Error on loading shark: ${error}`)
    this.name = 'LoadSharkError'
  }
}

export class DatabaseLoadSharkError extends Error {
  constructor(error: string) {
    super(`Error on loading shark in database: ${error}`)
    this.name = 'DatabaseLoadSharkError'
  }
}
