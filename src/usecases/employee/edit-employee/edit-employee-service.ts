import { EditEmployeeModel } from '@usecases'
import {
  EditEmployeeProtocol,
  EditEmployeeRepositoryProtocol,
} from './protocols'
import { ValidatorProtocol } from '@utils'
import { schema } from './edit-employee-service-schema'

export class DbEditEmployee implements EditEmployeeProtocol {
  constructor(
    private readonly EditEmployeeRepository: EditEmployeeRepositoryProtocol,
    private readonly EditEmployeeValidator: ValidatorProtocol<EditEmployeeRepositoryProtocol.Params>,
  ) {}

  async map({
    id,
    name,
    date,
    welcomeMessage,
  }: EditEmployeeModel.Params): Promise<EditEmployeeRepositoryProtocol.Params> {
    return {
      id,
      name,
      date,
      welcomeMessage,
    }
  }

  async edit(
    id: string,
    { name, date, welcomeMessage }: EditEmployeeModel.Params,
  ): Promise<EditEmployeeProtocol.Result> {
    this.EditEmployeeValidator.validate(schema, {
      id,
      name,
      date,
      welcomeMessage,
    })

    const params = await this.map({
      id,
      name,
      date,
      welcomeMessage,
    })

    return this.EditEmployeeRepository.edit(id, params)
  }
}
