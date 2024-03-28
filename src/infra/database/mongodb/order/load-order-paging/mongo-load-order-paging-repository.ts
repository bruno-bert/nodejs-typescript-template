import { LoadOrderPagingRepositoryProtocol } from '@usecases'
import { MongoHelper, QueryBuilder } from '../../utils'
import { DatabaseLoadOrderPagingError } from '@usecases/order/load-order-paging/errors'

export class LoadOrderPagingMongoRepository
  implements LoadOrderPagingRepositoryProtocol
{
  private COLLECTION: string = 'order'

  async loadPaging(): Promise<LoadOrderPagingRepositoryProtocol.Result> {
    try {
      const OrderCollection = await MongoHelper.getCollection(this.COLLECTION)
      const query = new QueryBuilder()
        .project({
          _id: 1,
          welcomeMessage: 1,
          name: 1,
          date: 1,
        })
        .build()
      const documents = await OrderCollection.aggregate(query).toArray()
      return MongoHelper.mapCollection(documents)
    } catch (error) {
      throw new DatabaseLoadOrderPagingError(error as string)
    }
  }
}
