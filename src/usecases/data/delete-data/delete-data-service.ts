import { DeleteDataModel } from '@usecases'
import { DeleteDataProtocol, DeleteDataRepositoryProtocol } from './protocols'
import { ValidatorProtocol } from '@utils'
import { schema } from './delete-data-service-schema'

export class DbDeleteData implements DeleteDataProtocol {
  constructor(
    private readonly deleteDataRepository: DeleteDataRepositoryProtocol,
    private readonly deleteDataValidator: ValidatorProtocol<DeleteDataRepositoryProtocol.Params>,
  ) {}

  async map({
    id,
  }: DeleteDataModel.Params): Promise<DeleteDataRepositoryProtocol.Params> {
    return {
      id,
    }
  }

  async delete({
    id,
  }: DeleteDataModel.Params): Promise<DeleteDataProtocol.Result> {
    const params = await this.map({
      id,
    })

    this.deleteDataValidator.validate(schema, { id })

    return await this.deleteDataRepository.delete(params)
  }
}
