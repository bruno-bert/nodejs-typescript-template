import { CreateDataModel } from '@usecases'
import { CreateDataProtocol, CreateDataRepositoryProtocol } from './protocols'

export class DbCreateData implements CreateDataProtocol {
  constructor(
    private readonly CreateDataRepository: CreateDataRepositoryProtocol,
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
    const params = await this.map({
      name,
      welcomeMessage,
      date,
    })

    return this.CreateDataRepository.create(params)
  }
}
