import { MongoHelper } from '../../utils'
import { DatabaseInvalidIdError, EditOrderRepositoryProtocol } from '@usecases'
import {
  DatabaseEditOrderError,
  DatabaseEditOrderNotFoundError,
} from '@usecases/order/edit-order/errors'
import { ObjectId } from 'mongodb'

export class EditOrderMongoRepository implements EditOrderRepositoryProtocol {
  private COLLECTION: string = 'order'

  async edit(
    id: string,
    params: EditOrderRepositoryProtocol.Params,
  ): Promise<EditOrderRepositoryProtocol.Result> {
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

      const update = {
        $set: params,
      }

      const result = await OrderCollection.findOneAndUpdate(query, update, {
        returnDocument: 'after',
      })

      if (result) {
        return MongoHelper.map(result)
      } else {
        throw new DatabaseEditOrderNotFoundError('id: ' + id)
      }
    } catch (error) {
      if (error instanceof DatabaseEditOrderNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseEditOrderError(error as string)
    }
  }
}
