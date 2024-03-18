import { MongoHelper } from '../utils'
import { LoadDataDetailRepositoryProtocol } from '@usecases'
import { ObjectId } from 'mongodb'

export class LoadDataDetailMongoRepository
  implements LoadDataDetailRepositoryProtocol
{
  private COLLECTION: string = 'sales'

  async loadById(id: string): Promise<LoadDataDetailRepositoryProtocol.Result> {
    const detailCollection = await MongoHelper.getCollection(this.COLLECTION)
    const detail = await detailCollection.findOne({
      _id: new ObjectId(id),
    })
    return detail && MongoHelper.map(detail)
  }
}
