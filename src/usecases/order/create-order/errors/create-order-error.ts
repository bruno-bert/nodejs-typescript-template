export class CreateOrderError extends Error {
  constructor(error: string) {
    super(`Error on creating order: ${error}`)
    this.name = 'CreateOrderError'
  }
}

export class DatabaseCreateOrderError extends Error {
  constructor(error: string) {
    super(`Error on creating order in database: ${error}`)
    this.name = 'DatabaseCreateOrderError'
  }
}
