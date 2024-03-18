import { MongoHelper, QueryBuilder } from '@infra/mongodb'
import { LoadDataRepositoryProtocol } from '@usecases'

export class LoadDataMongoRepository implements LoadDataRepositoryProtocol {
  private COLLECTION: string = 'sales'

  async loadAll(): Promise<LoadDataRepositoryProtocol.Result> {
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
  }
}
