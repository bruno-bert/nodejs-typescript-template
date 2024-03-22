export class LoadDataDetailError extends Error {
  constructor(error: string) {
    super(`Error on loading data detail: ${error}`)
    this.name = 'LoadDataDetailError'
  }
}
