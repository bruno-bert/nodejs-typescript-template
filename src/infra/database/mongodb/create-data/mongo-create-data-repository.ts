import { DatabaseCreateDataError } from '@usecases/data/create-data/errors'
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
      const result = { id: document.insertedId.toString(), ...params }
      return MongoHelper.map(result)
    } catch (error) {
      throw new DatabaseCreateDataError(error as string)
    }
  }
}
