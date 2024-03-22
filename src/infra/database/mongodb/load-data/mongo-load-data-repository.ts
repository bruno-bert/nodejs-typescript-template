import { LoadDataRepositoryProtocol } from '@usecases'
import { MongoHelper, QueryBuilder } from '../utils'
import { DatabaseLoadDataError } from '@usecases/data/load-data/errors'

export class LoadDataMongoRepository implements LoadDataRepositoryProtocol {
  private COLLECTION: string = 'sales'

  async loadAll(): Promise<LoadDataRepositoryProtocol.Result> {
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
      throw new DatabaseLoadDataError(error as string)
    }
  }
}
