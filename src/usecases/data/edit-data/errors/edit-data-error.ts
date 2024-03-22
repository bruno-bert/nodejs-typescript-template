export class EditDataError extends Error {
  constructor(error: string) {
    super(`Error on editing data: ${error}`)
    this.name = 'EditDataError'
  }
}
