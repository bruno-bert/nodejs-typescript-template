import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok, notFound } from '@presentation/helpers'
import { DeleteEmployeeProtocol } from './protocols'
import { DeleteEmployeeModel } from '@usecases'
import { DeleteEmployeeNotFoundError } from './errors'
import { errorToHttpResponse } from '@utils/error-handler'

export class DeleteEmployeeController implements Controller {
  constructor(private readonly DeleteEmployee: DeleteEmployeeProtocol) {}

  async map({
    id,
  }: DeleteEmployeeController.Request): Promise<DeleteEmployeeModel.Params> {
    return { id }
  }

  async handle(
    request: DeleteEmployeeController.Request,
  ): Promise<HttpResponse> {
    try {
      const id = request.id
      const params = await this.map({
        id,
      })
      const data = await this.DeleteEmployee.delete(params)
      return data ? ok(data) : noContent()
    } catch (error: any) {
      if (error instanceof DeleteEmployeeNotFoundError) return notFound()
      return errorToHttpResponse(error)
    }
  }
}

export namespace DeleteEmployeeController {
  export type Request = {
    id: string
  }
}
