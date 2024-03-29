import { Controller } from '@presentation/protocols'

import { CreateEmployeeMongoRepository } from '@infra'
// import { CreateEmployeePrismaRepository } from '@infra'

import {
  DbCreateEmployee,
  CreateEmployeeRepositoryProtocol,
  CreateEmployeeController,
  CreateEmployeeProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class CreateEmployeeFactory extends AbstractFactory<CreateRepositoryProtocol> {
  // makePrismaRepository = (): CreateEmployeeRepositoryProtocol => {
  //   const repository = new CreateEmployeePrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): CreateEmployeeRepositoryProtocol => {
    const repository = new CreateEmployeeMongoRepository()
    return repository
  }

  makeDbCreateEmployee = (): CreateEmployeeProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbCreateEmployee(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new CreateEmployeeController(this.makeDbCreateEmployee())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeCreateEmployeeFactory = () => {
  return new CreateEmployeeFactory()
}
