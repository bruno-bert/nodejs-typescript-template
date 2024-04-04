import { LoadSharkRepositoryProtocol } from '@usecases'
import { MongoHelper, QueryBuilder } from '../../utils'
import { DatabaseLoadSharkError } from '@usecases/shark/load-shark/errors'

export class LoadSharkMongoRepository implements LoadSharkRepositoryProtocol {
  private COLLECTION: string = 'shark'

  async loadAll(): Promise<LoadSharkRepositoryProtocol.Result> {
    try {
      const SharkCollection = await MongoHelper.getCollection(this.COLLECTION)
      const query = new QueryBuilder()
        .project({
          _id: 1,
          name: 1,
          date: 1,
          welcomeMessage: 1,
        })
        .build()
      const documents = await SharkCollection.aggregate(query).toArray()
      return MongoHelper.mapCollection(documents)
    } catch (error) {
      throw new DatabaseLoadSharkError(error as string)
    }
  }
}
