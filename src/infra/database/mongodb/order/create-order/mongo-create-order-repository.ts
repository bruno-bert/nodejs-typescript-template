import { DatabaseCreateOrderError } from '@usecases/order/create-order/errors'
import { MongoHelper } from '../../utils'
import { CreateOrderRepositoryProtocol } from '@usecases'

export class CreateOrderMongoRepository
  implements CreateOrderRepositoryProtocol
{
  private COLLECTION: string = 'order'

  async create(
    params: CreateOrderRepositoryProtocol.Params,
  ): Promise<CreateOrderRepositoryProtocol.Result> {
    try {
      const OrderCollection = await MongoHelper.getCollection(this.COLLECTION)
      const document = await OrderCollection.insertOne(params)
      const result = { id: document.insertedId.toString(), ...params }
      return MongoHelper.map(result)
    } catch (error) {
      throw new DatabaseCreateOrderError(error as string)
    }
  }
}
