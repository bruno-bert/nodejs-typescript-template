import { LoadDataError } from './errors'
import { LoadDataProtocol, LoadDataRepositoryProtocol } from './protocols'

export class DbLoadData implements LoadDataProtocol {
  constructor(
    private readonly loadDataRepository: LoadDataRepositoryProtocol,
  ) {}

  async load(): Promise<LoadDataProtocol.Result> {
    try {
      return await this.loadDataRepository.loadAll()
    } catch (error) {
      throw new LoadDataError(error as unknown as string)
    }
  }
}
