import { Controller } from '@presentation/protocols'

import { LoadEmployeeDetailMongoRepository } from '@infra/database/mongodb/employee'
// import { LoadEmployeeDetailPrismaRepository }  from '@infra/database/prisma/employee'

import {
  DbLoadEmployeeDetail,
  LoadEmployeeDetailRepositoryProtocol,
  LoadEmployeeDetailController,
  LoadEmployeeDetailProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadEmployeeDetailFactory extends AbstractFactory<LoadEmployeeDetailRepositoryProtocol> {
  // makePrismaRepository = (): LoadEmployeeDetailRepositoryProtocol => {
  //   const repository = new LoadEmployeeDetailPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): LoadEmployeeDetailRepositoryProtocol => {
    const repository = new LoadEmployeeDetailMongoRepository()
    return repository
  }

  makeDbLoadEmployeeDetail = (): LoadEmployeeDetailProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadEmployeeDetail(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadEmployeeDetailController(
      this.makeDbLoadEmployeeDetail(),
    )
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeLoadEmployeeDetailFactory = () => {
  return new LoadEmployeeDetailFactory()
}
