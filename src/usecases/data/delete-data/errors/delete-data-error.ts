export class DeleteDataError extends Error {
  constructor(error: string) {
    super(`Error on deleting data: ${error}`)
    this.name = 'DeleteDataError'
  }
}
