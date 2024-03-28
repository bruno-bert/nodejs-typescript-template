import { Controller } from '@presentation/protocols'

import { LoadOrderMongoRepository } from '@infra/database/mongodb/order'
// import { LoadOrderPrismaRepository }  from '@infra/database/prisma/order'

import {
  DbLoadOrder,
  LoadOrderRepositoryProtocol,
  LoadOrderController,
  LoadOrderProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadOrderFactory extends AbstractFactory<LoadOrderRepositoryProtocol> {
  // makePrismaRepository = (): LoadOrderRepositoryProtocol => {
  //   const repository = new LoadOrderPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): LoadOrderRepositoryProtocol => {
    const repository = new LoadOrderMongoRepository()
    return repository
  }

  makeDbLoadOrder = (): LoadOrderProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadOrder(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadOrderController(this.makeDbLoadOrder())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeLoadOrderFactory = () => {
  return new LoadOrderFactory()
}
