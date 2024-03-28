import { Controller } from '@presentation/protocols'

import { EditEmployeeMongoRepository } from '@infra/database/mongodb/employee'
// import { EditEmployeePrismaRepository } from '@infra/database/prisma/employee'

import {
  DbEditEmployee,
  EditEmployeeRepositoryProtocol,
  EditEmployeeController,
  EditEmployeeProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class EditEmployeeFactory extends AbstractFactory<EditEmployeeRepositoryProtocol> {
  // makePrismaRepository = (): EditEmployeeRepositoryProtocol => {
  //   const repository = new EditEmployeePrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): EditEmployeeRepositoryProtocol => {
    const repository = new EditEmployeeMongoRepository()
    return repository
  }

  makeDbEditEmployee = (): EditEmployeeProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbEditEmployee(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new EditEmployeeController(this.makeDbEditEmployee())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeEditEmployeeFactory = () => {
  return new EditEmployeeFactory()
}
