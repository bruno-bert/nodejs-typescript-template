export class DeleteOrderError extends Error {
  constructor(error: string) {
    super(`Error on deleting order: ${error}`)
    this.name = 'DeleteOrderError'
  }
}

export class DeleteOrderNotFoundError extends Error {
  constructor(error: string) {
    super(`Error on deleting order: ${error}`)
    this.name = 'DeleteOrderNotFoundError'
  }
}

export class DatabaseDeleteOrderError extends DeleteOrderError {
  constructor(error: string) {
    super(`Error on deleting order in repository: ${error}`)
    this.name = 'DeleteOrderNotFoundError'
  }
}
export class DatabaseDeleteOrderNotFoundError extends DeleteOrderNotFoundError {
  constructor(error: string) {
    super(`Error on deleting order in repository: ${error}`)
    this.name = 'DeleteOrderNotFoundError'
  }
}
