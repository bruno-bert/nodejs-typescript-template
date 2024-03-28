import { MongoHelper } from '../../utils'
import {
  DatabaseInvalidIdError,
  DeleteEmployeeRepositoryProtocol,
} from '@usecases'
import {
  DatabaseDeleteEmployeeError,
  DatabaseDeleteEmployeeNotFoundError,
} from '@usecases/employee/delete-employee/errors'

import { ObjectId } from 'mongodb'

export class DeleteEmployeeMongoRepository
  implements DeleteEmployeeRepositoryProtocol
{
  private COLLECTION: string = 'employee'

  async delete({
    id,
  }: DeleteEmployeeRepositoryProtocol.Params): Promise<DeleteEmployeeRepositoryProtocol.Result> {
    try {
      let objectId
      try {
        objectId = new ObjectId(id)
      } catch (error) {
        throw new DatabaseInvalidIdError(error as string)
      }

      const EmployeeCollection = await MongoHelper.getCollection(
        this.COLLECTION,
      )

      const query = {
        _id: objectId,
      }

      const result = await EmployeeCollection.deleteOne(query)
      if (result?.deletedCount) {
        return { success: true, count: result?.deletedCount }
      } else {
        throw new DatabaseDeleteEmployeeNotFoundError('id: ' + id)
      }
    } catch (error) {
      if (error instanceof DatabaseDeleteEmployeeNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseDeleteEmployeeError(error as string)
    }
  }
}
