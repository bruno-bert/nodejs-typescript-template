export class MongoLoadDataError extends Error {
  constructor(error: string) {
    super(`Error on loading records on repository: ${error}`)
    this.name = 'MongoLoadDataError'
  }
}
