import { LoadSharkPagingRepositoryProtocol } from '@usecases'
import { MongoHelper, QueryBuilder } from '../../utils'
import { DatabaseLoadSharkPagingError } from '@usecases/shark/load-shark-paging/errors'

export class LoadSharkPagingMongoRepository
  implements LoadSharkPagingRepositoryProtocol
{
  private COLLECTION: string = 'shark'

  async loadPaging(): Promise<LoadSharkPagingRepositoryProtocol.Result> {
    try {
      const SharkCollection = await MongoHelper.getCollection(this.COLLECTION)
      const query = new QueryBuilder()
        .project({
          _id: 1,
          welcomeMessage: 1,
          name: 1,
          date: 1,
        })
        .build()
      const documents = await SharkCollection.aggregate(query).toArray()
      return MongoHelper.mapCollection(documents)
    } catch (error) {
      throw new DatabaseLoadSharkPagingError(error as string)
    }
  }
}
