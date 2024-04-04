import { PrismaHelper, prismaClient as prisma } from '../../utils'
import {
  DatabaseInvalidIdError,
  LoadSharkDetailRepositoryProtocol,
} from '@usecases'
import {
  DatabaseLoadSharkDetailError,
  DatabaseLoadSharkDetailNotFoundError,
} from '@usecases/shark/load-shark-detail/errors'

export class LoadSharkDetailPrismaRepository
  implements LoadSharkDetailRepositoryProtocol
{
  async loadById(
    id: string,
  ): Promise<LoadSharkDetailRepositoryProtocol.Result> {
    try {
      const where: any = { id }

      const item = await prisma.shark.findUnique({ where })
      if (!item) {
        throw new DatabaseLoadSharkDetailNotFoundError('id: ' + id)
      }
      return PrismaHelper.map(item)
    } catch (error) {
      if (error instanceof DatabaseLoadSharkDetailNotFoundError) throw error
      if (error instanceof DatabaseInvalidIdError) throw error
      throw new DatabaseLoadSharkDetailError(error as string)
    }
  }
}
