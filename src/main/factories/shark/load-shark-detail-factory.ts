import { Controller } from '@presentation/protocols'

import { LoadSharkDetailMongoRepository } from '@infra/database/mongodb/shark'
import { LoadSharkDetailPrismaRepository } from '@infra/database/prisma/shark'

import {
  DbLoadSharkDetail,
  LoadSharkDetailRepositoryProtocol,
  LoadSharkDetailController,
  LoadSharkDetailProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadSharkDetailFactory extends AbstractFactory<LoadSharkDetailRepositoryProtocol> {
  makePrismaRepository = (): LoadSharkDetailRepositoryProtocol => {
    const repository = new LoadSharkDetailPrismaRepository()
    return repository
  }

  makeMongoRepository = (): LoadSharkDetailRepositoryProtocol => {
    const repository = new LoadSharkDetailMongoRepository()
    return repository
  }

  makeDbLoadSharkDetail = (): LoadSharkDetailProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadSharkDetail(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadSharkDetailController(
      this.makeDbLoadSharkDetail(),
    )
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeLoadSharkDetailFactory = () => {
  return new LoadSharkDetailFactory()
}
