export class EditOrderError extends Error {
  constructor(error: string) {
    super(`Error on editing order: ${error}`)
    this.name = 'EditOrderError'
  }
}

export class EditOrderNotFoundError extends EditOrderError {
  constructor(error: string) {
    super(`Error on editing order: ${error}`)
    this.name = 'EditOrderError'
  }
}

export class DatabaseEditOrderError extends EditOrderError {
  constructor(error: string) {
    super(`Error on editing order in database: ${error}`)
    this.name = 'DatabaseEditOrderError'
  }
}

export class DatabaseEditOrderNotFoundError extends EditOrderNotFoundError {
  constructor(error: string) {
    super(`Error on editing order in database: ${error}`)
    this.name = 'DatabaseEditOrderError'
  }
}
