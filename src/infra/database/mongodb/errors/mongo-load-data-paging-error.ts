export class MongoLoadDataPagingError extends Error {
  constructor(error: string) {
    super(`Error on loading paginated records on repository: ${error}`)
    this.name = 'MongoLoadDataPagingError'
  }
}
