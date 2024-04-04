import { ValidatorProtocol } from '@utils'
import {
  LoadSharkDetailProtocol,
  LoadSharkDetailRepositoryProtocol,
} from './protocols'
import { schema } from './load-shark-detail-service-schema'

export class DbLoadSharkDetail implements LoadSharkDetailProtocol {
  constructor(
    private readonly LoadSharkDetailRepository: LoadSharkDetailRepositoryProtocol,
    private readonly LoadSharkDetailValidator: ValidatorProtocol<LoadSharkDetailRepositoryProtocol.Params>,
  ) {}

  async load(id: string): Promise<LoadSharkDetailProtocol.Result> {
    this.LoadSharkDetailValidator.validate(schema, { id })
    return this.LoadSharkDetailRepository.loadById(id)
  }
}
