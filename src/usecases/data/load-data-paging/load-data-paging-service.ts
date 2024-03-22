import { LoadDataPagingError } from './errors'
import {
  LoadDataPagingProtocol,
  LoadDataPagingRepositoryProtocol,
} from './protocols'

export class DbLoadDataPaging implements LoadDataPagingProtocol {
  constructor(
    private readonly loadDataPagingRepository: LoadDataPagingRepositoryProtocol,
  ) {}

  async loadPaging(): Promise<LoadDataPagingProtocol.Result> {
    try {
      return await this.loadDataPagingRepository.loadPaging()
    } catch (error) {
      throw new LoadDataPagingError(error as unknown as string)
    }
  }
}
