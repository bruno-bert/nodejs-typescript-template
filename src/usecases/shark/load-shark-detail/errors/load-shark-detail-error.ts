export class LoadSharkDetailError extends Error {
  constructor(error: string) {
    super(`Error on loading shark detail: ${error}`)
    this.name = 'LoadSharkDetailError'
  }
}

export class LoadSharkDetailNotFoundError extends Error {
  constructor(error: string) {
    super(`Error on loading shark detail: ${error}`)
    this.name = 'LoadSharkDetailNotFoundError'
  }
}

export class DatabaseLoadSharkDetailError extends LoadSharkDetailError {
  constructor(error: string) {
    super(`Error on loading shark detail in database: ${error}`)
    this.name = 'DatabaseLoadSharkDetailError'
  }
}

export class DatabaseLoadSharkDetailNotFoundError extends LoadSharkDetailNotFoundError {
  constructor(error: string) {
    super(`Error on loading shark detail in database: ${error}`)
    this.name = 'DatabaseLoadSharkDetailNotFoundError'
  }
}
