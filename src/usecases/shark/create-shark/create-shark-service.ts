import { CreateSharkModel, MissingParamsError } from '@usecases'
import { CreateSharkProtocol, CreateSharkRepositoryProtocol } from './protocols'
import { ValidatorProtocol } from '@utils'
import { schema } from './create-shark-service-schema'

export class DbCreateShark implements CreateSharkProtocol {
  constructor(
    private readonly CreateSharkRepository: CreateSharkRepositoryProtocol,
    private readonly CreateSharkValitator: ValidatorProtocol<CreateSharkRepositoryProtocol.Params>,
  ) {}

  async map({
    name,
    date,
    welcomeMessage,
  }: CreateSharkModel.Params): Promise<CreateSharkRepositoryProtocol.Params> {
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
  }: CreateSharkModel.Params): Promise<CreateSharkProtocol.Result> {
    const validate = await this.CreateSharkValitator.validate(schema, {
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

    return this.CreateSharkRepository.create(params)
  }
}
