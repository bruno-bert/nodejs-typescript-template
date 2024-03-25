import { MongoHelper } from '../utils'
import { DatabaseInvalidIdError, EditDataRepositoryProtocol } from '@usecases'
import {
  DatabaseEditDataError,
  DatabaseEditDataNotFoundError,
} from '@usecases/data/edit-data/errors'
import { ObjectId } from 'mongodb'

export class EditDataMongoRepository implements EditDataRepositoryProtocol {
  private COLLECTION: string = 'sales'

  async edit(
    id: string,
    params: EditDataRepositoryProtocol.Params,
  ): Promise<EditDataRepositoryProtocol.Result> {
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

      const update = {
        $set: params,
      }

      const result = await DataCollection.findOneAndUpdate(query, update, {
        returnDocument: 'after',
      })

      if (result) {
        return MongoHelper.map(result)
      } else {
        throw new DatabaseEditDataNotFoundError('id: ' + id)
      }
    } catch (error) {
      if (error instanceof DatabaseEditDataNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseEditDataError(error as string)
    }
  }
}
