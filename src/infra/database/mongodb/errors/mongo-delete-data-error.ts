export class MongoDeleteDataError extends Error {
  constructor(error: string) {
    super(`Error on deleting record on repository: ${error}`)
    this.name = 'MongoDeleteDataError'
  }
}

export class MongoDeleteDataNotFoundError extends MongoDeleteDataError {
  constructor(error: string) {
    super(`Record not found: ${error}`)
    this.name = 'MongoDeleteDataNotFoundError'
  }
}
