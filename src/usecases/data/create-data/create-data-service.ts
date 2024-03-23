import { CreateDataModel, MissingParamsError } from '@usecases'
import { CreateDataProtocol, CreateDataRepositoryProtocol } from './protocols'
import { ValidatorProtocol } from '@utils'
import { schema } from './create-data-service-schema'

export class DbCreateData implements CreateDataProtocol {
  constructor(
    private readonly createDataRepository: CreateDataRepositoryProtocol,
    private readonly createDataValitator: ValidatorProtocol<CreateDataRepositoryProtocol.Params>,
  ) {}

  async map({
    name,
    welcomeMessage,
    date,
  }: CreateDataModel.Params): Promise<CreateDataRepositoryProtocol.Params> {
    return {
      name,
      welcomeMessage,
      date,
    }
  }

  handleValidationErrors(validate: ValidatorProtocol.Result) {
    throw new MissingParamsError(validate.originalMessage || '')
  }

  async create({
    name,
    welcomeMessage,
    date,
  }: CreateDataModel.Params): Promise<CreateDataProtocol.Result> {
    const validate = await this.createDataValitator.validate(schema, {
      name,
      welcomeMessage,
      date,
    })

    if (!validate.success) this.handleValidationErrors(validate)

    const params = await this.map({
      name,
      welcomeMessage,
      date,
    })

    return this.createDataRepository.create(params)
  }
}
