import { DeleteSharkModel } from '@usecases'
import { DeleteSharkProtocol, DeleteSharkRepositoryProtocol } from './protocols'
import { ValidatorProtocol } from '@utils'
import { schema } from './delete-shark-service-schema'

export class DbDeleteShark implements DeleteSharkProtocol {
  constructor(
    private readonly DeleteSharkRepository: DeleteSharkRepositoryProtocol,
    private readonly DeleteSharkValidator: ValidatorProtocol<DeleteSharkRepositoryProtocol.Params>,
  ) {}

  async map({
    id,
  }: DeleteSharkModel.Params): Promise<DeleteSharkRepositoryProtocol.Params> {
    return {
      id,
    }
  }

  async delete({
    id,
  }: DeleteSharkModel.Params): Promise<DeleteSharkProtocol.Result> {
    const params = await this.map({
      id,
    })

    this.DeleteSharkValidator.validate(schema, { id })

    return await this.DeleteSharkRepository.delete(params)
  }
}
