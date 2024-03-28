import { Controller } from '@presentation/protocols'

import { CreateOrderMongoRepository } from '@infra/database/mongodb/order'

// import { CreateOrderPrismaRepository } from '@infra/database/prisma/order'

import {
  DbCreateOrder,
  CreateOrderRepositoryProtocol,
  CreateOrderController,
  CreateOrderProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class CreateOrderFactory extends AbstractFactory<CreateOrderRepositoryProtocol> {
  // makePrismaRepository = (): CreateOrderRepositoryProtocol => {
  //   const repository = new CreateOrderPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): CreateOrderRepositoryProtocol => {
    const repository = new CreateOrderMongoRepository()
    return repository
  }

  makeDbCreateOrder = (): CreateOrderProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbCreateOrder(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new CreateOrderController(this.makeDbCreateOrder())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeCreateOrderFactory = () => {
  return new CreateOrderFactory()
}
