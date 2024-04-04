export class LoadSharkPagingError extends Error {
  constructor(error: string) {
    super(`Error on loading shark paging: ${error}`)
    this.name = 'LoadSharkPagingError'
  }
}

export class DatabaseLoadSharkPagingError extends Error {
  constructor(error: string) {
    super(`Error on loading shark paging in database: ${error}`)
    this.name = 'DatabaseLoadSharkPagingError'
  }
}
