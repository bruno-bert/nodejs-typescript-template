export class EditEmployeeError extends Error {
  constructor(error: string) {
    super(`Error on editing employee: ${error}`)
    this.name = 'EditEmployeeError'
  }
}

export class EditEmployeeNotFoundError extends EditEmployeeError {
  constructor(error: string) {
    super(`Error on editing employee: ${error}`)
    this.name = 'EditEmployeeError'
  }
}

export class DatabaseEditEmployeeError extends EditEmployeeError {
  constructor(error: string) {
    super(`Error on editing employee in database: ${error}`)
    this.name = 'DatabaseEditEmployeeError'
  }
}

export class DatabaseEditEmployeeNotFoundError extends EditEmployeeNotFoundError {
  constructor(error: string) {
    super(`Error on editing employee in database: ${error}`)
    this.name = 'DatabaseEditEmployeeError'
  }
}
