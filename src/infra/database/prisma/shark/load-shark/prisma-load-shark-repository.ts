import { LoadSharkRepositoryProtocol } from '@usecases'
import { PrismaHelper, prismaClient as prisma } from '../../utils'
import { DatabaseLoadSharkError } from '@usecases/shark/load-shark/errors'

export class LoadSharkPrismaRepository implements LoadSharkRepositoryProtocol {
  async loadAll(): Promise<LoadSharkRepositoryProtocol.Result> {
    try {
      const where: any = {}

      const items = await prisma.shark.findMany({ where })

      return PrismaHelper.mapCollection(items)
    } catch (error) {
      throw new DatabaseLoadSharkError(error as string)
    }
  }
}
