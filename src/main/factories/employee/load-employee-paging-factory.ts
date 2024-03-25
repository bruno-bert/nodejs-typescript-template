import { Controller } from '@presentation/protocols'

import { LoadEmployeePagingMongoRepository } from '@infra'
// import { LoadEmployeePagingPrismaRepository } from '@infra'

import {
  DbLoadEmployeePaging,
  LoadEmployeePagingRepositoryProtocol,
  LoadEmployeePagingController,
  LoadEmployeePagingProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadEmployeePagingFactory extends AbstractFactory<LoadEmployeePagingRepositoryProtocol> {
  // makePrismaRepository = (): LoadEmployeePagingRepositoryProtocol => {
  //   const repository = new LoadEmployeePagingPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): LoadEmployeePagingRepositoryProtocol => {
    const repository = new LoadEmployeePagingMongoRepository()
    return repository
  }

  makeDbLoadEmployeePaging = (): LoadEmployeePagingProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadEmployeePaging(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadEmployeePagingController(
      this.makeDbLoadEmployeePaging(),
    )
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeLoadEmployeePagingFactory = () => {
  return new LoadEmployeePagingFactory()
}
