import { ValidatorProtocol } from '@utils'
import { LoadOrderPagingError } from './errors'
import {
  LoadOrderPagingProtocol,
  LoadOrderPagingRepositoryProtocol,
} from './protocols'

export class DbLoadOrderPaging implements LoadOrderPagingProtocol {
  constructor(
    private readonly LoadOrderPagingRepository: LoadOrderPagingRepositoryProtocol,
    private readonly LoadOrderPagingValidator: ValidatorProtocol<LoadOrderPagingRepositoryProtocol.Params>,
  ) {}

  async loadPaging(): Promise<LoadOrderPagingProtocol.Result> {
    try {
      // this.LoadOrderPagingValidator.validate(null, {})
      return await this.LoadOrderPagingRepository.loadPaging()
    } catch (error) {
      throw new LoadOrderPagingError(error as unknown as string)
    }
  }
}
