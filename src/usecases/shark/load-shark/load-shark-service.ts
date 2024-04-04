import { ValidatorProtocol } from '@utils'
import { LoadSharkError } from './errors'
import { LoadSharkProtocol, LoadSharkRepositoryProtocol } from './protocols'

export class DbLoadShark implements LoadSharkProtocol {
  constructor(
    private readonly LoadSharkRepository: LoadSharkRepositoryProtocol,
    private readonly LoadSharkValidator: ValidatorProtocol<any>,
  ) {}

  async load(): Promise<LoadSharkProtocol.Result> {
    try {
      // this.LoadSharkValidator.validate(null, {})
      return await this.LoadSharkRepository.loadAll()
    } catch (error) {
      throw new LoadSharkError(error as unknown as string)
    }
  }
}
