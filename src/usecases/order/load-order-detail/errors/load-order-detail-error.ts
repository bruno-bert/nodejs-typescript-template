export class LoadOrderDetailError extends Error {
  constructor(error: string) {
    super(`Error on loading order detail: ${error}`)
    this.name = 'LoadOrderDetailError'
  }
}

export class LoadOrderDetailNotFoundError extends Error {
  constructor(error: string) {
    super(`Error on loading order detail: ${error}`)
    this.name = 'LoadOrderDetailNotFoundError'
  }
}

export class DatabaseLoadOrderDetailError extends LoadOrderDetailError {
  constructor(error: string) {
    super(`Error on loading order detail in database: ${error}`)
    this.name = 'DatabaseLoadOrderDetailError'
  }
}

export class DatabaseLoadOrderDetailNotFoundError extends LoadOrderDetailNotFoundError {
  constructor(error: string) {
    super(`Error on loading order detail in database: ${error}`)
    this.name = 'DatabaseLoadOrderDetailNotFoundError'
  }
}
