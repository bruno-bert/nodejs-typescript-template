export class DatabaseInvalidIdError extends Error {
  constructor(error: string) {
    super(`Invalid ID format error: ${error}`)
    this.name = 'DatabaseInvalidIdError'
  }
}
