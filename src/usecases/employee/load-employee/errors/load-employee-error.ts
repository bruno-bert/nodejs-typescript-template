export class LoadEmployeeError extends Error {
  constructor(error: string) {
    super(`Error on loading employee: ${error}`)
    this.name = 'LoadEmployeeError'
  }
}

export class DatabaseLoadEmployeeError extends Error {
  constructor(error: string) {
    super(`Error on loading employee in database: ${error}`)
    this.name = 'DatabaseLoadEmployeeError'
  }
}
