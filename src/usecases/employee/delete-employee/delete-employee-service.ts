import { DeleteEmployeeModel } from '@usecases'
import {
  DeleteEmployeeProtocol,
  DeleteEmployeeRepositoryProtocol,
} from './protocols'
import { ValidatorProtocol } from '@utils'
import { schema } from './delete-employee-service-schema'

export class DbDeleteEmployee implements DeleteEmployeeProtocol {
  constructor(
    private readonly DeleteEmployeeRepository: DeleteEmployeeRepositoryProtocol,
    private readonly DeleteEmployeeValidator: ValidatorProtocol<DeleteEmployeeRepositoryProtocol.Params>,
  ) {}

  async map({
    id,
  }: DeleteEmployeeModel.Params): Promise<DeleteEmployeeRepositoryProtocol.Params> {
    return {
      id,
    }
  }

  async delete({
    id,
  }: DeleteEmployeeModel.Params): Promise<DeleteEmployeeProtocol.Result> {
    const params = await this.map({
      id,
    })

    this.DeleteEmployeeValidator.validate(schema, { id })

    return await this.DeleteEmployeeRepository.delete(params)
  }
}
