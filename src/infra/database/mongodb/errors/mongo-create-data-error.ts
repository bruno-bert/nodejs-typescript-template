export class MongoCreateDataError extends Error {
  constructor(error: string) {
    super(`Error on creating record on repository: ${error}`)
    this.name = 'MongoCreateDataError'
  }
}
