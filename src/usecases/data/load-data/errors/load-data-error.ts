export class LoadDataError extends Error {
  constructor(error: string) {
    super(`Error on loading data: ${error}`)
    this.name = 'LoadDataError'
  }
}
