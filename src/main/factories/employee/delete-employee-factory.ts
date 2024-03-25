import { Controller } from '@presentation/protocols'

import { DeleteEmployeeMongoRepository } from '@infra'
// import { DeleteEmployeePrismaRepository } from '@infra'

import {
  DbDeleteEmployee,
  DeleteEmployeeRepositoryProtocol,
  DeleteEmployeeController,
  DeleteEmployeeProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class DeleteEmployeeFactory extends AbstractFactory<DeleteEmployeeRepositoryProtocol> {
  // makePrismaRepository = (): DeleteEmployeeRepositoryProtocol => {
  //   const repository = new DeleteEmployeePrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): DeleteEmployeeRepositoryProtocol => {
    const repository = new DeleteEmployeeMongoRepository()
    return repository
  }

  makeDbDeleteEmployee = (): DeleteEmployeeProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbDeleteEmployee(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new DeleteEmployeeController(this.makeDbDeleteEmployee())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeDeleteEmployeeFactory = () => {
  return new DeleteEmployeeFactory()
}
