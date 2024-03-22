export class LoadDataPagingError extends Error {
  constructor(error: string) {
    super(`Error on loading data paging: ${error}`)
    this.name = 'LoadDataPagingError'
  }
}
