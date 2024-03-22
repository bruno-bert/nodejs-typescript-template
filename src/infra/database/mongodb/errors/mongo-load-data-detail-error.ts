export class MongoLoadDataDetailError extends Error {
  constructor(error: string) {
    super(`Error on loading record on repository: ${error}`)
    this.name = 'MongoLoadDataDetailError'
  }
}
