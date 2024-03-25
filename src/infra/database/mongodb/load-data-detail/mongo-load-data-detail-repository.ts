import { MongoHelper } from '../utils'
import {
  DatabaseInvalidIdError,
  LoadDataDetailRepositoryProtocol,
} from '@usecases'
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
      let objectId

      try {
        objectId = new ObjectId(id)
      } catch (error) {
        throw new DatabaseInvalidIdError(error as string)
      }

      const detailCollection = await MongoHelper.getCollection(this.COLLECTION)
      const detail = await detailCollection.findOne({
        _id: objectId,
      })

      if (!detail) throw new DatabaseLoadDataDetailNotFoundError('id: ' + id)

      return detail && MongoHelper.map(detail)
    } catch (error) {
      if (error instanceof DatabaseLoadDataDetailNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseLoadDataDetailError(error as string)
    }
  }
}
