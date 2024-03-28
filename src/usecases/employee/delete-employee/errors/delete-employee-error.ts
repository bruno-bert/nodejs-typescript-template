export class DeleteEmployeeError extends Error {
  constructor(error: string) {
    super(`Error on deleting employee: ${error}`)
    this.name = 'DeleteEmployeeError'
  }
}

export class DeleteEmployeeNotFoundError extends Error {
  constructor(error: string) {
    super(`Error on deleting employee: ${error}`)
    this.name = 'DeleteEmployeeNotFoundError'
  }
}

export class DatabaseDeleteEmployeeError extends DeleteEmployeeError {
  constructor(error: string) {
    super(`Error on deleting employee in repository: ${error}`)
    this.name = 'DeleteEmployeeNotFoundError'
  }
}
export class DatabaseDeleteEmployeeNotFoundError extends DeleteEmployeeNotFoundError {
  constructor(error: string) {
    super(`Error on deleting employee in repository: ${error}`)
    this.name = 'DeleteEmployeeNotFoundError'
  }
}
