import { DatabaseCreateSharkError } from '@usecases/shark/create-shark/errors'
import { PrismaHelper, prismaClient as prisma } from '../../utils'
import { CreateSharkRepositoryProtocol } from '@usecases'

export class CreateSharkPrismaRepository
  implements CreateSharkRepositoryProtocol
{
  async create(
    params: CreateSharkRepositoryProtocol.Params,
  ): Promise<CreateSharkRepositoryProtocol.Result> {
    try {
      const item = await prisma.shark.create({
        data: params,
      })

      return PrismaHelper.map(item)
    } catch (error) {
      console.log(`error`, error)
      throw new DatabaseCreateSharkError(error as string)
    }
  }
}
