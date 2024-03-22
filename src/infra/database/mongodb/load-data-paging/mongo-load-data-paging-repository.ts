import { LoadDataPagingRepositoryProtocol } from '@usecases'
import { MongoLoadDataPagingError } from '../errors'
import { MongoHelper, QueryBuilder } from '../utils'

export class LoadDataPagingMongoRepository
  implements LoadDataPagingRepositoryProtocol
{
  private COLLECTION: string = 'sales'

  async loadPaging(): Promise<LoadDataPagingRepositoryProtocol.Result> {
    try {
      const AnyDataCollection = await MongoHelper.getCollection(this.COLLECTION)
      const query = new QueryBuilder()
        .project({
          _id: 1,
          welcomeMessage: 1,
          name: 1,
          date: 1,
        })
        // .match({
        //   accountId: accountId
        // })
        .build()
      const documents = await AnyDataCollection.aggregate(query).toArray()
      return MongoHelper.mapCollection(documents)
    } catch (error) {
      throw new MongoLoadDataPagingError(error as string)
    }
  }
}
