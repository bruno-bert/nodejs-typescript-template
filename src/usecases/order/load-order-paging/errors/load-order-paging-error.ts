export class LoadOrderPagingError extends Error {
  constructor(error: string) {
    super(`Error on loading order paging: ${error}`)
    this.name = 'LoadOrderPagingError'
  }
}

export class DatabaseLoadOrderPagingError extends Error {
  constructor(error: string) {
    super(`Error on loading order paging in database: ${error}`)
    this.name = 'DatabaseLoadOrderPagingError'
  }
}
