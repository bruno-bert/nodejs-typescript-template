import { ValidatorProtocol } from '@utils'
import {
  LoadOrderDetailProtocol,
  LoadOrderDetailRepositoryProtocol,
} from './protocols'
import { schema } from './load-order-detail-service-schema'

export class DbLoadOrderDetail implements LoadOrderDetailProtocol {
  constructor(
    private readonly LoadOrderDetailRepository: LoadOrderDetailRepositoryProtocol,
    private readonly LoadOrderDetailValidator: ValidatorProtocol<LoadOrderDetailRepositoryProtocol.Params>,
  ) {}

  async load(id: string): Promise<LoadOrderDetailProtocol.Result> {
    this.LoadOrderDetailValidator.validate(schema, { id })
    return this.LoadOrderDetailRepository.loadById(id)
  }
}
