import { CreateOrderModel, MissingParamsError } from '@usecases'
import { CreateOrderProtocol, CreateOrderRepositoryProtocol } from './protocols'
import { ValidatorProtocol } from '@utils'
import { schema } from './create-order-service-schema'

export class DbCreateOrder implements CreateOrderProtocol {
  constructor(
    private readonly CreateOrderRepository: CreateOrderRepositoryProtocol,
    private readonly CreateOrderValitator: ValidatorProtocol<CreateOrderRepositoryProtocol.Params>,
  ) {}

  async map({
    orderId,
    manufacturerId,
    purchaseDate,
    productId,
  }: CreateOrderModel.Params): Promise<CreateOrderRepositoryProtocol.Params> {
    return {
      orderId,
      manufacturerId,
      purchaseDate,
      productId,
    }
  }

  handleValidationErrors(validate: ValidatorProtocol.Result) {
    throw new MissingParamsError(validate.originalMessage || '')
  }

  async create({
    orderId,
    manufacturerId,
    purchaseDate,
    productId,
  }: CreateOrderModel.Params): Promise<CreateOrderProtocol.Result> {
    const validate = await this.CreateOrderValitator.validate(schema, {
      orderId,
      manufacturerId,
      purchaseDate,
      productId,
    })

    if (!validate.success) this.handleValidationErrors(validate)

    const params = await this.map({
      orderId,
      manufacturerId,
      purchaseDate,
      productId,
    })

    return this.CreateOrderRepository.create(params)
  }
}
