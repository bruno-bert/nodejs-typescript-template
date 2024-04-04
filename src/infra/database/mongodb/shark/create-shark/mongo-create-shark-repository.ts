import { DatabaseCreateSharkError } from '@usecases/shark/create-shark/errors'
import { MongoHelper } from '../../utils'
import { CreateSharkRepositoryProtocol } from '@usecases'

export class CreateSharkMongoRepository
  implements CreateSharkRepositoryProtocol
{
  private COLLECTION: string = 'shark'

  async create(
    params: CreateSharkRepositoryProtocol.Params,
  ): Promise<CreateSharkRepositoryProtocol.Result> {
    try {
      const SharkCollection = await MongoHelper.getCollection(this.COLLECTION)
      const document = await SharkCollection.insertOne(params)
      const result = { id: document.insertedId.toString(), ...params }
      return MongoHelper.map(result)
    } catch (error) {
      throw new DatabaseCreateSharkError(error as string)
    }
  }
}
