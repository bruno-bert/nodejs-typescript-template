import { DeleteDataModel } from '@usecases'
import { DeleteDataProtocol, DeleteDataRepositoryProtocol } from './protocols'

export class DbDeleteData implements DeleteDataProtocol {
  constructor(
    private readonly deleteDataRepository: DeleteDataRepositoryProtocol,
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
    return await this.deleteDataRepository.delete(params)
  }
}
