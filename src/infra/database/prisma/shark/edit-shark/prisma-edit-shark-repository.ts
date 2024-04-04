import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { PrismaHelper, prismaClient as prisma } from '../../utils'
import { DatabaseInvalidIdError, EditSharkRepositoryProtocol } from '@usecases'
import {
  DatabaseEditSharkError,
  DatabaseEditSharkNotFoundError,
} from '@usecases/shark/edit-shark/errors'

export class EditSharkPrismaRepository implements EditSharkRepositoryProtocol {
  async edit(
    id: string,
    params: EditSharkRepositoryProtocol.Params,
  ): Promise<EditSharkRepositoryProtocol.Result> {
    try {
      const where: any = { id }

      let item

      try {
        item = await prisma.shark.update({ where, data: params })
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          String(error.meta?.cause).toUpperCase().includes('NOT FOUND')
        ) {
          throw new DatabaseEditSharkNotFoundError('id: ' + id)
        } else {
          throw error
        }
      }

      return PrismaHelper.map(item)
    } catch (error) {
      if (error instanceof DatabaseEditSharkNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseEditSharkError(error as string)
    }
  }
}
