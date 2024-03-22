export class EditDataError extends Error {
  constructor(error: string) {
    super(`Error on editing data: ${error}`)
    this.name = 'EditDataError'
  }
}

export class EditDataNotFoundError extends EditDataError {
  constructor(error: string) {
    super(`Error on editing data: ${error}`)
    this.name = 'EditDataError'
  }
}

export class DatabaseEditDataError extends EditDataError {
  constructor(error: string) {
    super(`Error on editing data in database: ${error}`)
    this.name = 'DatabaseEditDataError'
  }
}

export class DatabaseEditDataNotFoundError extends EditDataNotFoundError {
  constructor(error: string) {
    super(`Error on editing data in database: ${error}`)
    this.name = 'DatabaseEditDataError'
  }
}
