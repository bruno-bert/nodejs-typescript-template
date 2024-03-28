export class LoadEmployeeDetailError extends Error {
  constructor(error: string) {
    super(`Error on loading employee detail: ${error}`)
    this.name = 'LoadEmployeeDetailError'
  }
}

export class LoadEmployeeDetailNotFoundError extends Error {
  constructor(error: string) {
    super(`Error on loading employee detail: ${error}`)
    this.name = 'LoadEmployeeDetailNotFoundError'
  }
}

export class DatabaseLoadEmployeeDetailError extends LoadEmployeeDetailError {
  constructor(error: string) {
    super(`Error on loading employee detail in database: ${error}`)
    this.name = 'DatabaseLoadEmployeeDetailError'
  }
}

export class DatabaseLoadEmployeeDetailNotFoundError extends LoadEmployeeDetailNotFoundError {
  constructor(error: string) {
    super(`Error on loading employee detail in database: ${error}`)
    this.name = 'DatabaseLoadEmployeeDetailNotFoundError'
  }
}
