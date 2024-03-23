import { CreateDataModel } from '@usecases'
import { CreateDataProtocol, CreateDataRepositoryProtocol } from './protocols'
import { ValidatorProtocol } from '@utils'

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

  async create({
    name,
    welcomeMessage,
    date,
  }: CreateDataModel.Params): Promise<CreateDataProtocol.Result> {
    this.createDataValitator.validate({
      name,
      welcomeMessage,
      date,
    })

    const params = await this.map({
      name,
      welcomeMessage,
      date,
    })

    return this.createDataRepository.create(params)
  }
}
