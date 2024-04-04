import { Controller } from '@presentation/protocols'

import { LoadSharkPagingMongoRepository } from '@infra/database/mongodb/shark'
import { LoadSharkPagingPrismaRepository } from '@infra/database/prisma/shark'

import {
  DbLoadSharkPaging,
  LoadSharkPagingRepositoryProtocol,
  LoadSharkPagingController,
  LoadSharkPagingProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadSharkPagingFactory extends AbstractFactory<LoadSharkPagingRepositoryProtocol> {
  makePrismaRepository = (): LoadSharkPagingRepositoryProtocol => {
    const repository = new LoadSharkPagingPrismaRepository()
    return repository
  }

  makeMongoRepository = (): LoadSharkPagingRepositoryProtocol => {
    const repository = new LoadSharkPagingMongoRepository()
    return repository
  }

  makeDbLoadSharkPaging = (): LoadSharkPagingProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadSharkPaging(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadSharkPagingController(
      this.makeDbLoadSharkPaging(),
    )
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeLoadSharkPagingFactory = () => {
  return new LoadSharkPagingFactory()
}
