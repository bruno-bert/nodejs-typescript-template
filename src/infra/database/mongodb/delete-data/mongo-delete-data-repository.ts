import { MongoHelper } from '../utils'
import { DeleteDataRepositoryProtocol } from '@usecases'
import { ObjectId } from 'mongodb'
import { MongoDeleteDataError, MongoDeleteDataNotFoundError } from '../errors'

export class DeleteDataMongoRepository implements DeleteDataRepositoryProtocol {
  private COLLECTION: string = 'sales'

  async delete({
    id,
  }: DeleteDataRepositoryProtocol.Params): Promise<DeleteDataRepositoryProtocol.Result> {
    try {
      const DataCollection = await MongoHelper.getCollection(this.COLLECTION)

      const query = {
        _id: new ObjectId(id),
      }

      const result = await DataCollection.deleteOne(query)
      if (result?.deletedCount) {
        return { success: true, count: result?.deletedCount }
      } else {
        throw new MongoDeleteDataNotFoundError('id: ' + id)
      }
    } catch (error) {
      throw new MongoDeleteDataError(error as string)
    }
  }
}
