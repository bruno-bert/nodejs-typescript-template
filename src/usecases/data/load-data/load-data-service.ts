import { ValidatorProtocol } from '@utils'
import { LoadDataError } from './errors'
import { LoadDataProtocol, LoadDataRepositoryProtocol } from './protocols'

export class DbLoadData implements LoadDataProtocol {
  constructor(
    private readonly loadDataRepository: LoadDataRepositoryProtocol,
    private readonly loadDataValidator: ValidatorProtocol<any>,
  ) {}

  async load(): Promise<LoadDataProtocol.Result> {
    try {
      this.loadDataValidator.validate({})
      return await this.loadDataRepository.loadAll()
    } catch (error) {
      throw new LoadDataError(error as unknown as string)
    }
  }
}
