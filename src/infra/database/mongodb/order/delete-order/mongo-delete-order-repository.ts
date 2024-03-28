import { MongoHelper } from '../../utils'
import {
  DatabaseInvalidIdError,
  DeleteOrderRepositoryProtocol,
} from '@usecases'
import {
  DatabaseDeleteOrderError,
  DatabaseDeleteOrderNotFoundError,
} from '@usecases/order/delete-order/errors'

import { ObjectId } from 'mongodb'

export class DeleteOrderMongoRepository
  implements DeleteOrderRepositoryProtocol
{
  private COLLECTION: string = 'order'

  async delete({
    id,
  }: DeleteOrderRepositoryProtocol.Params): Promise<DeleteOrderRepositoryProtocol.Result> {
    try {
      let objectId
      try {
        objectId = new ObjectId(id)
      } catch (error) {
        throw new DatabaseInvalidIdError(error as string)
      }

      const OrderCollection = await MongoHelper.getCollection(this.COLLECTION)

      const query = {
        _id: objectId,
      }

      const result = await OrderCollection.deleteOne(query)
      if (result?.deletedCount) {
        return { success: true, count: result?.deletedCount }
      } else {
        throw new DatabaseDeleteOrderNotFoundError('id: ' + id)
      }
    } catch (error) {
      if (error instanceof DatabaseDeleteOrderNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseDeleteOrderError(error as string)
    }
  }
}
