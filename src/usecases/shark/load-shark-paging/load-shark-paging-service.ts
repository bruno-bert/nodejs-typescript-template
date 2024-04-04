import { ValidatorProtocol } from '@utils'
import { LoadSharkPagingError } from './errors'
import {
  LoadSharkPagingProtocol,
  LoadSharkPagingRepositoryProtocol,
} from './protocols'

export class DbLoadSharkPaging implements LoadSharkPagingProtocol {
  constructor(
    private readonly LoadSharkPagingRepository: LoadSharkPagingRepositoryProtocol,
    private readonly LoadSharkPagingValidator: ValidatorProtocol<LoadSharkPagingRepositoryProtocol.Params>,
  ) {}

  async map(
    params: LoadSharkPagingProtocol.Params,
  ): Promise<LoadSharkPagingRepositoryProtocol.Params> {
    return params as LoadSharkPagingRepositoryProtocol.Params
  }

  async loadPaging(
    params: LoadSharkPagingProtocol.Params,
  ): Promise<LoadSharkPagingProtocol.Result> {
    try {
      // this.LoadSharkPagingValidator.validate(null, {})

      const mapped = await this.map(params)

      return await this.LoadSharkPagingRepository.loadPaging(mapped)
    } catch (error) {
      throw new LoadSharkPagingError(error as unknown as string)
    }
  }
}
