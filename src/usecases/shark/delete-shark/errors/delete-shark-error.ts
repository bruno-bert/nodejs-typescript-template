export class DeleteSharkError extends Error {
  constructor(error: string) {
    super(`Error on deleting shark: ${error}`)
    this.name = 'DeleteSharkError'
  }
}

export class DeleteSharkNotFoundError extends Error {
  constructor(error: string) {
    super(`Error on deleting shark: ${error}`)
    this.name = 'DeleteSharkNotFoundError'
  }
}

export class DatabaseDeleteSharkError extends DeleteSharkError {
  constructor(error: string) {
    super(`Error on deleting shark in repository: ${error}`)
    this.name = 'DeleteSharkNotFoundError'
  }
}
export class DatabaseDeleteSharkNotFoundError extends DeleteSharkNotFoundError {
  constructor(error: string) {
    super(`Error on deleting shark in repository: ${error}`)
    this.name = 'DeleteSharkNotFoundError'
  }
}
