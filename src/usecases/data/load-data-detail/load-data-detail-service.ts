import { ValidatorProtocol } from '@utils'
import {
  LoadDataDetailProtocol,
  LoadDataDetailRepositoryProtocol,
} from './protocols'

export class DbLoadDataDetail implements LoadDataDetailProtocol {
  constructor(
    private readonly loadDataDetailRepository: LoadDataDetailRepositoryProtocol,
    private readonly loadDataDetailValidator: ValidatorProtocol<LoadDataDetailRepositoryProtocol.Params>,
  ) {}

  async load(id: string): Promise<LoadDataDetailProtocol.Result> {
    this.loadDataDetailValidator.validate({ id })
    return this.loadDataDetailRepository.loadById(id)
  }
}
