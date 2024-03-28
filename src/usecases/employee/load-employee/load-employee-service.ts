import { ValidatorProtocol } from '@utils'
import { LoadEmployeeError } from './errors'
import {
  LoadEmployeeProtocol,
  LoadEmployeeRepositoryProtocol,
} from './protocols'

export class DbLoadEmployee implements LoadEmployeeProtocol {
  constructor(
    private readonly LoadEmployeeRepository: LoadEmployeeRepositoryProtocol,
    private readonly LoadEmployeeValidator: ValidatorProtocol<any>,
  ) {}

  async load(): Promise<LoadEmployeeProtocol.Result> {
    try {
      // this.LoadEmployeeValidator.validate(null, {})
      return await this.LoadEmployeeRepository.loadAll()
    } catch (error) {
      throw new LoadEmployeeError(error as unknown as string)
    }
  }
}
