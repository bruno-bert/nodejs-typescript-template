import { MongoHelper } from '../utils'
import { EditDataRepositoryProtocol } from '@usecases'
import { ObjectId } from 'mongodb'
import { MongoEditDataError, MongoEditDataNotFoundError } from '../errors'

export class EditDataMongoRepository implements EditDataRepositoryProtocol {
  private COLLECTION: string = 'sales'

  async edit(
    id: string,
    params: EditDataRepositoryProtocol.Params,
  ): Promise<EditDataRepositoryProtocol.Result> {
    try {
      const DataCollection = await MongoHelper.getCollection(this.COLLECTION)
      const query = {
        _id: new ObjectId(id),
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
        throw new MongoEditDataNotFoundError('id: ' + id)
      }
    } catch (error) {
      throw new MongoEditDataError(error as string)
    }
  }
}
