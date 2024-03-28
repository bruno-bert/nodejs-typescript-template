import { Controller } from '@presentation/protocols'

import { EditOrderMongoRepository } from '@infra/database/mongodb/order'
// import { EditOrderPrismaRepository } from '@infra/database/prisma/order'

import {
  DbEditOrder,
  EditOrderRepositoryProtocol,
  EditOrderController,
  EditOrderProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class EditOrderFactory extends AbstractFactory<EditOrderRepositoryProtocol> {
  // makePrismaRepository = (): EditOrderRepositoryProtocol => {
  //   const repository = new EditOrderPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): EditOrderRepositoryProtocol => {
    const repository = new EditOrderMongoRepository()
    return repository
  }

  makeDbEditOrder = (): EditOrderProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbEditOrder(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new EditOrderController(this.makeDbEditOrder())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeEditOrderFactory = () => {
  return new EditOrderFactory()
}
