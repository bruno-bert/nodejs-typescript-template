import { MongoHelper } from '../../utils'
import {
  DatabaseInvalidIdError,
  LoadSharkDetailRepositoryProtocol,
} from '@usecases'
import {
  DatabaseLoadSharkDetailError,
  DatabaseLoadSharkDetailNotFoundError,
} from '@usecases/shark/load-shark-detail/errors'

import { ObjectId } from 'mongodb'

export class LoadSharkDetailMongoRepository
  implements LoadSharkDetailRepositoryProtocol
{
  private COLLECTION: string = 'shark'

  async loadById(
    id: string,
  ): Promise<LoadSharkDetailRepositoryProtocol.Result> {
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

      if (!detail) throw new DatabaseLoadSharkDetailNotFoundError('id: ' + id)

      return detail && MongoHelper.map(detail)
    } catch (error) {
      if (error instanceof DatabaseLoadSharkDetailNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseLoadSharkDetailError(error as string)
    }
  }
}
