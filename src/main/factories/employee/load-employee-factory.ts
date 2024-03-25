import { Controller } from '@presentation/protocols'

import { LoadEmployeeMongoRepository } from '@infra'
// import { LoadEmployeePrismaRepository } from '@infra'

import {
  DbLoadEmployee,
  LoadEmployeeRepositoryProtocol,
  LoadEmployeeController,
  LoadEmployeeProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadEmployeeFactory extends AbstractFactory<LoadEmployeeRepositoryProtocol> {
  // makePrismaRepository = (): LoadEmployeeRepositoryProtocol => {
  //   const repository = new LoadEmployeePrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): LoadEmployeeRepositoryProtocol => {
    const repository = new LoadEmployeeMongoRepository()
    return repository
  }

  makeDbLoadEmployee = (): LoadEmployeeProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadEmployee(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadEmployeeController(this.makeDbLoadEmployee())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeLoadEmployeeFactory = () => {
  return new LoadEmployeeFactory()
}
