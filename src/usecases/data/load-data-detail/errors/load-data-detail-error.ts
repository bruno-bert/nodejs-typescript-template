export class LoadDataDetailError extends Error {
  constructor(error: string) {
    super(`Error on loading data detail: ${error}`)
    this.name = 'LoadDataDetailError'
  }
}

export class LoadDataDetailNotFoundError extends Error {
  constructor(error: string) {
    super(`Error on loading data detail: ${error}`)
    this.name = 'LoadDataDetailNotFoundError'
  }
}

export class DatabaseLoadDataDetailError extends LoadDataDetailError {
  constructor(error: string) {
    super(`Error on loading data detail in database: ${error}`)
    this.name = 'DatabaseLoadDataDetailError'
  }
}

export class DatabaseLoadDataDetailNotFoundError extends LoadDataDetailNotFoundError {
  constructor(error: string) {
    super(`Error on loading data detail in database: ${error}`)
    this.name = 'DatabaseLoadDataDetailNotFoundError'
  }
}
