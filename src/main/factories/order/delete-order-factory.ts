import { Controller } from '@presentation/protocols'

import { DeleteOrderMongoRepository } from '@infra/database/mongodb/order'
// import { DeleteOrderPrismaRepository }  from '@infra/database/prisma/order'

import {
  DbDeleteOrder,
  DeleteOrderRepositoryProtocol,
  DeleteOrderController,
  DeleteOrderProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class DeleteOrderFactory extends AbstractFactory<DeleteOrderRepositoryProtocol> {
  // makePrismaRepository = (): DeleteOrderRepositoryProtocol => {
  //   const repository = new DeleteOrderPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): DeleteOrderRepositoryProtocol => {
    const repository = new DeleteOrderMongoRepository()
    return repository
  }

  makeDbDeleteOrder = (): DeleteOrderProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbDeleteOrder(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new DeleteOrderController(this.makeDbDeleteOrder())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeDeleteOrderFactory = () => {
  return new DeleteOrderFactory()
}
