import { EditOrderModel } from '@usecases'
import { EditOrderProtocol, EditOrderRepositoryProtocol } from './protocols'
import { ValidatorProtocol } from '@utils'
import { schema } from './edit-order-service-schema'

export class DbEditOrder implements EditOrderProtocol {
  constructor(
    private readonly EditOrderRepository: EditOrderRepositoryProtocol,
    private readonly EditOrderValidator: ValidatorProtocol<EditOrderRepositoryProtocol.Params>,
  ) {}

  async map({
    id,
    orderId,
    manufacturerId,
    purchaseDate,
    productId,
  }: EditOrderModel.Params): Promise<EditOrderRepositoryProtocol.Params> {
    return {
      id,
      orderId,
      manufacturerId,
      purchaseDate,
      productId,
    }
  }

  async edit(
    id: string,
    { orderId, manufacturerId, purchaseDate, productId }: EditOrderModel.Params,
  ): Promise<EditOrderProtocol.Result> {
    this.EditOrderValidator.validate(schema, {
      id,
      orderId,
      manufacturerId,
      purchaseDate,
      productId,
    })

    const params = await this.map({
      id,
      orderId,
      manufacturerId,
      purchaseDate,
      productId,
    })

    return this.EditOrderRepository.edit(id, params)
  }
}
