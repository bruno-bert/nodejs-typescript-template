import { MongoHelper } from '../utils'
import { LoadDataDetailRepositoryProtocol } from '@usecases'
import {
  DatabaseLoadDataDetailError,
  DatabaseLoadDataDetailNotFoundError,
} from '@usecases/data/load-data-detail/errors'

import { ObjectId } from 'mongodb'

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

      if (!detail) throw new DatabaseLoadDataDetailNotFoundError('id: ' + id)

      return detail && MongoHelper.map(detail)
    } catch (error) {
      if (error instanceof DatabaseLoadDataDetailNotFoundError) throw error
      throw new DatabaseLoadDataDetailError(error as string)
    }
  }
}
