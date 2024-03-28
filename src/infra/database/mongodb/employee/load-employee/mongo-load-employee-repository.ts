import { LoadEmployeeRepositoryProtocol } from '@usecases'
import { MongoHelper, QueryBuilder } from '../../utils'
import { DatabaseLoadEmployeeError } from '@usecases/employee/load-employee/errors'

export class LoadEmployeeMongoRepository
  implements LoadEmployeeRepositoryProtocol
{
  private COLLECTION: string = 'employee'

  async loadAll(): Promise<LoadEmployeeRepositoryProtocol.Result> {
    try {
      const EmployeeCollection = await MongoHelper.getCollection(
        this.COLLECTION,
      )
      const query = new QueryBuilder()
        .project({
          _id: 1,
          name: 1,
          date: 1,
          welcomeMessage: 1,
        })
        .build()
      const documents = await EmployeeCollection.aggregate(query).toArray()
      return MongoHelper.mapCollection(documents)
    } catch (error) {
      throw new DatabaseLoadEmployeeError(error as string)
    }
  }
}
