import { MongoHelper } from '../utils'
import { LoadDataDetailRepositoryProtocol } from '@usecases'
import { ObjectId } from 'mongodb'
import { MongoLoadDataDetailError } from '../errors'

export class LoadDataDetailMongoRepository
  implements LoadDataDetailRepositoryProtocol
{
  private COLLECTION: string = 'sales'

  async loadById(id: string): Promise<LoadDataDetailRepositoryProtocol.Result> {
    try {
      const detailCollection = await MongoHelper.getCollection(this.COLLECTION)
      const detail = await detailCollection.findOne({
        _id: new ObjectId(id),
      })
      return detail && MongoHelper.map(detail)
    } catch (error) {
      throw new MongoLoadDataDetailError(error as string)
    }
  }
}
