export class MongoEditDataError extends Error {
  constructor(error: string) {
    super(`Error on editing record on repository: ${error}`)
    this.name = 'MongoEditDataError'
  }
}

export class MongoEditDataNotFoundError extends MongoEditDataError {
  constructor(error: string) {
    super(`Record not found: ${error}`)
    this.name = 'MongoEditDataNotFoundError'
  }
}
