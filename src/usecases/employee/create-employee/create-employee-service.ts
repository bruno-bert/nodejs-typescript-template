import { CreateEmployeeModel, MissingParamsError } from '@usecases'
import {
  CreateEmployeeProtocol,
  CreateEmployeeRepositoryProtocol,
} from './protocols'
import { ValidatorProtocol } from '@utils'
import { schema } from './create-employee-service-schema'

export class DbCreateEmployee implements CreateEmployeeProtocol {
  constructor(
    private readonly CreateEmployeeRepository: CreateEmployeeRepositoryProtocol,
    private readonly CreateEmployeeValitator: ValidatorProtocol<CreateEmployeeRepositoryProtocol.Params>,
  ) {}

  async map({
    name,
    date,
    welcomeMessage,
  }: CreateEmployeeModel.Params): Promise<CreateEmployeeRepositoryProtocol.Params> {
    return {
      name,
      date,
      welcomeMessage,
    }
  }

  handleValidationErrors(validate: ValidatorProtocol.Result) {
    throw new MissingParamsError(validate.originalMessage || '')
  }

  async create({
    name,
    date,
    welcomeMessage,
  }: CreateEmployeeModel.Params): Promise<CreateEmployeeProtocol.Result> {
    const validate = await this.CreateEmployeeValitator.validate(schema, {
      name,
      date,
      welcomeMessage,
    })

    if (!validate.success) this.handleValidationErrors(validate)

    const params = await this.map({
      name,
      date,
      welcomeMessage,
    })

    return this.CreateEmployeeRepository.create(params)
  }
}
