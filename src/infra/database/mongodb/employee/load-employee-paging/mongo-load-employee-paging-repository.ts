import { LoadEmployeePagingRepositoryProtocol } from '@usecases'
import { MongoHelper, QueryBuilder } from '../../utils'
import { DatabaseLoadEmployeePagingError } from '@usecases/employee/load-employee-paging/errors'

export class LoadEmployeePagingMongoRepository
  implements LoadEmployeePagingRepositoryProtocol
{
  private COLLECTION: string = 'employee'

  async loadPaging(): Promise<LoadEmployeePagingRepositoryProtocol.Result> {
    try {
      const EmployeeCollection = await MongoHelper.getCollection(
        this.COLLECTION,
      )
      const query = new QueryBuilder()
        .project({
          _id: 1,
          welcomeMessage: 1,
          name: 1,
          date: 1,
        })
        .build()
      const documents = await EmployeeCollection.aggregate(query).toArray()
      return MongoHelper.mapCollection(documents)
    } catch (error) {
      throw new DatabaseLoadEmployeePagingError(error as string)
    }
  }
}
