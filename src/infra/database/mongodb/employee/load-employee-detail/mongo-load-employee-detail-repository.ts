import { MongoHelper } from '../../utils'
import {
  DatabaseInvalidIdError,
  LoadEmployeeDetailRepositoryProtocol,
} from '@usecases'
import {
  DatabaseLoadEmployeeDetailError,
  DatabaseLoadEmployeeDetailNotFoundError,
} from '@usecases/employee/load-employee-detail/errors'

import { ObjectId } from 'mongodb'

export class LoadEmployeeDetailMongoRepository
  implements LoadEmployeeDetailRepositoryProtocol
{
  private COLLECTION: string = 'employee'

  async loadById(
    id: string,
  ): Promise<LoadEmployeeDetailRepositoryProtocol.Result> {
    try {
      let objectId

      try {
        objectId = new ObjectId(id)
      } catch (error) {
        throw new DatabaseInvalidIdError(error as string)
      }

      const detailCollection = await MongoHelper.getCollection(this.COLLECTION)
      const detail = await detailCollection.findOne({
        _id: objectId,
      })

      if (!detail)
        throw new DatabaseLoadEmployeeDetailNotFoundError('id: ' + id)

      return detail && MongoHelper.map(detail)
    } catch (error) {
      if (error instanceof DatabaseLoadEmployeeDetailNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseLoadEmployeeDetailError(error as string)
    }
  }
}
