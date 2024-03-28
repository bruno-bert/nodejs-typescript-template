export class CreateEmployeeError extends Error {
  constructor(error: string) {
    super(`Error on creating employee: ${error}`)
    this.name = 'CreateEmployeeError'
  }
}

export class DatabaseCreateEmployeeError extends Error {
  constructor(error: string) {
    super(`Error on creating employee in database: ${error}`)
    this.name = 'DatabaseCreateEmployeeError'
  }
}
