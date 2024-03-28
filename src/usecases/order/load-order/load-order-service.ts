import { ValidatorProtocol } from '@utils'
import { LoadOrderError } from './errors'
import { LoadOrderProtocol, LoadOrderRepositoryProtocol } from './protocols'

export class DbLoadOrder implements LoadOrderProtocol {
  constructor(
    private readonly LoadOrderRepository: LoadOrderRepositoryProtocol,
    private readonly LoadOrderValidator: ValidatorProtocol<any>,
  ) {}

  async load(): Promise<LoadOrderProtocol.Result> {
    try {
      // this.LoadOrderValidator.validate(null, {})
      return await this.LoadOrderRepository.loadAll()
    } catch (error) {
      throw new LoadOrderError(error as unknown as string)
    }
  }
}
