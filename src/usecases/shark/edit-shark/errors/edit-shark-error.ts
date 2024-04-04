export class EditSharkError extends Error {
  constructor(error: string) {
    super(`Error on editing shark: ${error}`)
    this.name = 'EditSharkError'
  }
}

export class EditSharkNotFoundError extends EditSharkError {
  constructor(error: string) {
    super(`Error on editing shark: ${error}`)
    this.name = 'EditSharkError'
  }
}

export class DatabaseEditSharkError extends EditSharkError {
  constructor(error: string) {
    super(`Error on editing shark in database: ${error}`)
    this.name = 'DatabaseEditSharkError'
  }
}

export class DatabaseEditSharkNotFoundError extends EditSharkNotFoundError {
  constructor(error: string) {
    super(`Error on editing shark in database: ${error}`)
    this.name = 'DatabaseEditSharkError'
  }
}
