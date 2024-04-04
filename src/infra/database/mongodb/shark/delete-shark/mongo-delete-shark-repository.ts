import { MongoHelper } from '../../utils'
import {
  DatabaseInvalidIdError,
  DeleteSharkRepositoryProtocol,
} from '@usecases'
import {
  DatabaseDeleteSharkError,
  DatabaseDeleteSharkNotFoundError,
} from '@usecases/shark/delete-shark/errors'

import { ObjectId } from 'mongodb'

export class DeleteSharkMongoRepository
  implements DeleteSharkRepositoryProtocol
{
  private COLLECTION: string = 'shark'

  async delete({
    id,
  }: DeleteSharkRepositoryProtocol.Params): Promise<DeleteSharkRepositoryProtocol.Result> {
    try {
      let objectId
      try {
        objectId = new ObjectId(id)
      } catch (error) {
        throw new DatabaseInvalidIdError(error as string)
      }

      const SharkCollection = await MongoHelper.getCollection(this.COLLECTION)

      const query = {
        _id: objectId,
      }

      const result = await SharkCollection.deleteOne(query)
      if (result?.deletedCount) {
        return { success: true, count: result?.deletedCount }
      } else {
        throw new DatabaseDeleteSharkNotFoundError('id: ' + id)
      }
    } catch (error) {
      if (error instanceof DatabaseDeleteSharkNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseDeleteSharkError(error as string)
    }
  }
}
