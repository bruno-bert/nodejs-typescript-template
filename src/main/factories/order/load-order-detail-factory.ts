import { Controller } from '@presentation/protocols'

import { LoadOrderDetailMongoRepository } from '@infra/database/mongodb/order'
// import { LoadOrderDetailPrismaRepository }  from '@infra/database/prisma/order'

import {
  DbLoadOrderDetail,
  LoadOrderDetailRepositoryProtocol,
  LoadOrderDetailController,
  LoadOrderDetailProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadOrderDetailFactory extends AbstractFactory<LoadOrderDetailRepositoryProtocol> {
  // makePrismaRepository = (): LoadOrderDetailRepositoryProtocol => {
  //   const repository = new LoadOrderDetailPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): LoadOrderDetailRepositoryProtocol => {
    const repository = new LoadOrderDetailMongoRepository()
    return repository
  }

  makeDbLoadOrderDetail = (): LoadOrderDetailProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadOrderDetail(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadOrderDetailController(
      this.makeDbLoadOrderDetail(),
    )
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeLoadOrderDetailFactory = () => {
  return new LoadOrderDetailFactory()
}
