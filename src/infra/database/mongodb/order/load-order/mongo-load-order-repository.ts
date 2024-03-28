import { LoadOrderRepositoryProtocol } from '@usecases'
import { MongoHelper, QueryBuilder } from '../../utils'
import { DatabaseLoadOrderError } from '@usecases/order/load-order/errors'

export class LoadOrderMongoRepository implements LoadOrderRepositoryProtocol {
  private COLLECTION: string = 'order'

  async loadAll(): Promise<LoadOrderRepositoryProtocol.Result> {
    try {
      const OrderCollection = await MongoHelper.getCollection(this.COLLECTION)
      const query = new QueryBuilder()
        .project({
          _id: 1,
          orderId: 1,
          manufacturerId: 1,
          purchaseDate: 1,
          productId: 1,
        })
        .build()
      const documents = await OrderCollection.aggregate(query).toArray()
      return MongoHelper.mapCollection(documents)
    } catch (error) {
      throw new DatabaseLoadOrderError(error as string)
    }
  }
}
