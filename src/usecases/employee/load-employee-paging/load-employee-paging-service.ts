import { ValidatorProtocol } from '@utils'
import { LoadEmployeePagingError } from './errors'
import {
  LoadEmployeePagingProtocol,
  LoadEmployeePagingRepositoryProtocol,
} from './protocols'

export class DbLoadEmployeePaging implements LoadEmployeePagingProtocol {
  constructor(
    private readonly LoadEmployeePagingRepository: LoadEmployeePagingRepositoryProtocol,
    private readonly LoadEmployeePagingValidator: ValidatorProtocol<LoadEmployeePagingRepositoryProtocol.Params>,
  ) {}

  async loadPaging(): Promise<LoadEmployeePagingProtocol.Result> {
    try {
      // this.LoadEmployeePagingValidator.validate(null, {})
      return await this.LoadEmployeePagingRepository.loadPaging()
    } catch (error) {
      throw new LoadEmployeePagingError(error as unknown as string)
    }
  }
}
