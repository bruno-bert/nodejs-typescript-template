import { LoadSharkPagingRepositoryProtocol } from '@usecases'
import { PrismaHelper } from '../../utils'
import { DatabaseLoadSharkPagingError } from '@usecases/shark/load-shark-paging/errors'

export class LoadSharkPagingPrismaRepository
  implements LoadSharkPagingRepositoryProtocol
{
  async loadPaging(
    params: LoadSharkPagingRepositoryProtocol.Params,
  ): Promise<LoadSharkPagingRepositoryProtocol.Result> {
    try {
      const usePagination = params.usePagination || false
      const sortDefaultField = params.sortDefaultField || 'id'

      const result = await PrismaHelper.fetchData(
        params,
        'Shark',
        usePagination,
        sortDefaultField,
      )

      return result
    } catch (error) {
      console.log(`error on repository`, error)
      throw new DatabaseLoadSharkPagingError(error as string)
    }
  }
}
