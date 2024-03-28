import { DatabaseCreateEmployeeError } from '@usecases/employee/create-employee/errors'
import { MongoHelper } from '../../utils'
import { CreateEmployeeRepositoryProtocol } from '@usecases'

export class CreateEmployeeMongoRepository
  implements CreateEmployeeRepositoryProtocol
{
  private COLLECTION: string = 'employee'

  async create(
    params: CreateEmployeeRepositoryProtocol.Params,
  ): Promise<CreateEmployeeRepositoryProtocol.Result> {
    try {
      const EmployeeCollection = await MongoHelper.getCollection(
        this.COLLECTION,
      )
      const document = await EmployeeCollection.insertOne(params)
      const result = { id: document.insertedId.toString(), ...params }
      return MongoHelper.map(result)
    } catch (error) {
      throw new DatabaseCreateEmployeeError(error as string)
    }
  }
}
