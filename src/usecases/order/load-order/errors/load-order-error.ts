export class LoadOrderError extends Error {
  constructor(error: string) {
    super(`Error on loading order: ${error}`)
    this.name = 'LoadOrderError'
  }
}

export class DatabaseLoadOrderError extends Error {
  constructor(error: string) {
    super(`Error on loading order in database: ${error}`)
    this.name = 'DatabaseLoadOrderError'
  }
}
