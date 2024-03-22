import { MongoCreateDataError } from '../errors/mongo-create-data-error'
import { MongoHelper } from '../utils'
import { CreateDataRepositoryProtocol } from '@usecases'

export class CreateDataMongoRepository implements CreateDataRepositoryProtocol {
  private COLLECTION: string = 'sales'

  async create(
    params: CreateDataRepositoryProtocol.Params,
  ): Promise<CreateDataRepositoryProtocol.Result> {
    try {
      const DataCollection = await MongoHelper.getCollection(this.COLLECTION)
      const document = await DataCollection.insertOne(params)
      return { id: document.insertedId.toString(), ...params }
    } catch (error) {
      throw new MongoCreateDataError(error as string)
    }
  }
}
