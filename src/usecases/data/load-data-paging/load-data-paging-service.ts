import { ValidatorProtocol } from '@utils'
import { LoadDataPagingError } from './errors'
import {
  LoadDataPagingProtocol,
  LoadDataPagingRepositoryProtocol,
} from './protocols'

export class DbLoadDataPaging implements LoadDataPagingProtocol {
  constructor(
    private readonly loadDataPagingRepository: LoadDataPagingRepositoryProtocol,
    private readonly loadDataPagingValidator: ValidatorProtocol<LoadDataPagingRepositoryProtocol.Params>,
  ) {}

  async loadPaging(): Promise<LoadDataPagingProtocol.Result> {
    try {
      this.loadDataPagingValidator.validate({})
      return await this.loadDataPagingRepository.loadPaging()
    } catch (error) {
      throw new LoadDataPagingError(error as unknown as string)
    }
  }
}
