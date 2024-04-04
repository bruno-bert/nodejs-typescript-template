import { MongoHelper } from '../../utils'
import { DatabaseInvalidIdError, EditSharkRepositoryProtocol } from '@usecases'
import {
  DatabaseEditSharkError,
  DatabaseEditSharkNotFoundError,
} from '@usecases/shark/edit-shark/errors'
import { ObjectId } from 'mongodb'

export class EditSharkMongoRepository implements EditSharkRepositoryProtocol {
  private COLLECTION: string = 'shark'

  async edit(
    id: string,
    params: EditSharkRepositoryProtocol.Params,
  ): Promise<EditSharkRepositoryProtocol.Result> {
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

      const update = {
        $set: params,
      }

      const result = await SharkCollection.findOneAndUpdate(query, update, {
        returnDocument: 'after',
      })

      if (result) {
        return MongoHelper.map(result)
      } else {
        throw new DatabaseEditSharkNotFoundError('id: ' + id)
      }
    } catch (error) {
      if (error instanceof DatabaseEditSharkNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseEditSharkError(error as string)
    }
  }
}
