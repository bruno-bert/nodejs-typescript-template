import { ValidatorProtocol } from '@utils'
import {
  LoadDataDetailProtocol,
  LoadDataDetailRepositoryProtocol,
} from './protocols'
import { schema } from './load-data-detail-service-schema'

export class DbLoadDataDetail implements LoadDataDetailProtocol {
  constructor(
    private readonly loadDataDetailRepository: LoadDataDetailRepositoryProtocol,
    private readonly loadDataDetailValidator: ValidatorProtocol<LoadDataDetailRepositoryProtocol.Params>,
  ) {}

  async load(id: string): Promise<LoadDataDetailProtocol.Result> {
    this.loadDataDetailValidator.validate(schema, { id })
    return this.loadDataDetailRepository.loadById(id)
  }
}
