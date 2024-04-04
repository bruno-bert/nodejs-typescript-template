import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prismaClient as prisma } from '../../utils'
import {
  DatabaseInvalidIdError,
  DeleteSharkRepositoryProtocol,
} from '@usecases'
import {
  DatabaseDeleteSharkError,
  DatabaseDeleteSharkNotFoundError,
} from '@usecases/shark/delete-shark/errors'

export class DeleteSharkPrismaRepository
  implements DeleteSharkRepositoryProtocol
{
  async delete({
    id,
  }: DeleteSharkRepositoryProtocol.Params): Promise<DeleteSharkRepositoryProtocol.Result> {
    const where: any = { id }

    try {
      let item

      try {
        item = await prisma.shark.delete({ where })
        return { success: true, count: 1, item }
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          String(error.meta?.cause).toUpperCase().includes('DOES NOT EXIST')
        ) {
          throw new DatabaseDeleteSharkNotFoundError('id: ' + id)
        } else {
          throw error
        }
      }
    } catch (error) {
      if (error instanceof DatabaseDeleteSharkNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseDeleteSharkError(error as string)
    }
  }
}
