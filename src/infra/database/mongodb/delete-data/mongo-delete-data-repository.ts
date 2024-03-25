import { MongoHelper } from '../utils'
import { DatabaseInvalidIdError, DeleteDataRepositoryProtocol } from '@usecases'
import {
  DatabaseDeleteDataError,
  DatabaseDeleteDataNotFoundError,
} from '@usecases/data/delete-data/errors'

import { ObjectId } from 'mongodb'

export class DeleteDataMongoRepository implements DeleteDataRepositoryProtocol {
  private COLLECTION: string = 'sales'

  async delete({
    id,
  }: DeleteDataRepositoryProtocol.Params): Promise<DeleteDataRepositoryProtocol.Result> {
    try {
      let objectId
      try {
        objectId = new ObjectId(id)
      } catch (error) {
        throw new DatabaseInvalidIdError(error as string)
      }

      const DataCollection = await MongoHelper.getCollection(this.COLLECTION)

      const query = {
        _id: objectId,
      }

      const result = await DataCollection.deleteOne(query)
      if (result?.deletedCount) {
        return { success: true, count: result?.deletedCount }
      } else {
        throw new DatabaseDeleteDataNotFoundError('id: ' + id)
      }
    } catch (error) {
      if (error instanceof DatabaseDeleteDataNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseDeleteDataError(error as string)
    }
  }
}
