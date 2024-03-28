import { MongoHelper } from '../../utils'
import {
  DatabaseInvalidIdError,
  EditEmployeeRepositoryProtocol,
} from '@usecases'
import {
  DatabaseEditEmployeeError,
  DatabaseEditEmployeeNotFoundError,
} from '@usecases/employee/edit-employee/errors'
import { ObjectId } from 'mongodb'

export class EditEmployeeMongoRepository
  implements EditEmployeeRepositoryProtocol
{
  private COLLECTION: string = 'employee'

  async edit(
    id: string,
    params: EditEmployeeRepositoryProtocol.Params,
  ): Promise<EditEmployeeRepositoryProtocol.Result> {
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

      const update = {
        $set: params,
      }

      const result = await EmployeeCollection.findOneAndUpdate(query, update, {
        returnDocument: 'after',
      })

      if (result) {
        return MongoHelper.map(result)
      } else {
        throw new DatabaseEditEmployeeNotFoundError('id: ' + id)
      }
    } catch (error) {
      if (error instanceof DatabaseEditEmployeeNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseEditEmployeeError(error as string)
    }
  }
}
