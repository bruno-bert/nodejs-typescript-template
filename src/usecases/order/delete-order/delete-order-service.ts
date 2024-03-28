import { DeleteOrderModel } from '@usecases'
import { DeleteOrderProtocol, DeleteOrderRepositoryProtocol } from './protocols'
import { ValidatorProtocol } from '@utils'
import { schema } from './delete-order-service-schema'

export class DbDeleteOrder implements DeleteOrderProtocol {
  constructor(
    private readonly DeleteOrderRepository: DeleteOrderRepositoryProtocol,
    private readonly DeleteOrderValidator: ValidatorProtocol<DeleteOrderRepositoryProtocol.Params>,
  ) {}

  async map({
    id,
  }: DeleteOrderModel.Params): Promise<DeleteOrderRepositoryProtocol.Params> {
    return {
      id,
    }
  }

  async delete({
    id,
  }: DeleteOrderModel.Params): Promise<DeleteOrderProtocol.Result> {
    const params = await this.map({
      id,
    })

    this.DeleteOrderValidator.validate(schema, { id })

    return await this.DeleteOrderRepository.delete(params)
  }
}
