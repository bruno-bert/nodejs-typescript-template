export class LoadEmployeePagingError extends Error {
  constructor(error: string) {
    super(`Error on loading employee paging: ${error}`)
    this.name = 'LoadEmployeePagingError'
  }
}

export class DatabaseLoadEmployeePagingError extends Error {
  constructor(error: string) {
    super(`Error on loading employee paging in database: ${error}`)
    this.name = 'DatabaseLoadEmployeePagingError'
  }
}
