import { MongoHelper } from '../../utils'
import {
  DatabaseInvalidIdError,
  LoadOrderDetailRepositoryProtocol,
} from '@usecases'
import {
  DatabaseLoadOrderDetailError,
  DatabaseLoadOrderDetailNotFoundError,
} from '@usecases/order/load-order-detail/errors'

import { ObjectId } from 'mongodb'

export class LoadOrderDetailMongoRepository
  implements LoadOrderDetailRepositoryProtocol
{
  private COLLECTION: string = 'order'

  async loadById(
    id: string,
  ): Promise<LoadOrderDetailRepositoryProtocol.Result> {
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

      if (!detail) throw new DatabaseLoadOrderDetailNotFoundError('id: ' + id)

      return detail && MongoHelper.map(detail)
    } catch (error) {
      if (error instanceof DatabaseLoadOrderDetailNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseLoadOrderDetailError(error as string)
    }
  }
}
