import { ValidatorProtocol } from '@utils'
import {
  LoadEmployeeDetailProtocol,
  LoadEmployeeDetailRepositoryProtocol,
} from './protocols'
import { schema } from './load-employee-detail-service-schema'

export class DbLoadEmployeeDetail implements LoadEmployeeDetailProtocol {
  constructor(
    private readonly LoadEmployeeDetailRepository: LoadEmployeeDetailRepositoryProtocol,
    private readonly LoadEmployeeDetailValidator: ValidatorProtocol<LoadEmployeeDetailRepositoryProtocol.Params>,
  ) {}

  async load(id: string): Promise<LoadEmployeeDetailProtocol.Result> {
    this.LoadEmployeeDetailValidator.validate(schema, { id })
    return this.LoadEmployeeDetailRepository.loadById(id)
  }
}
