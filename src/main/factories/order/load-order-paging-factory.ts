import { Controller } from '@presentation/protocols'

import { LoadOrderPagingMongoRepository } from '@infra/database/mongodb/order'
// import { LoadOrderPagingPrismaRepository } from '@infra/database/prisma/order'

import {
  DbLoadOrderPaging,
  LoadOrderPagingRepositoryProtocol,
  LoadOrderPagingController,
  LoadOrderPagingProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadOrderPagingFactory extends AbstractFactory<LoadOrderPagingRepositoryProtocol> {
  // makePrismaRepository = (): LoadOrderPagingRepositoryProtocol => {
  //   const repository = new LoadOrderPagingPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): LoadOrderPagingRepositoryProtocol => {
    const repository = new LoadOrderPagingMongoRepository()
    return repository
  }

  makeDbLoadOrderPaging = (): LoadOrderPagingProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadOrderPaging(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadOrderPagingController(
      this.makeDbLoadOrderPaging(),
    )
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeLoadOrderPagingFactory = () => {
  return new LoadOrderPagingFactory()
}
