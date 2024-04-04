import { Controller } from '@presentation/protocols'

import { LoadSharkMongoRepository } from '@infra/database/mongodb/shark'
import { LoadSharkPrismaRepository } from '@infra/database/prisma/shark'

import {
  DbLoadShark,
  LoadSharkRepositoryProtocol,
  LoadSharkController,
  LoadSharkProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadSharkFactory extends AbstractFactory<LoadSharkRepositoryProtocol> {
  makePrismaRepository = (): LoadSharkRepositoryProtocol => {
    const repository = new LoadSharkPrismaRepository()
    return repository
  }

  makeMongoRepository = (): LoadSharkRepositoryProtocol => {
    const repository = new LoadSharkMongoRepository()
    return repository
  }

  makeDbLoadShark = (): LoadSharkProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadShark(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadSharkController(this.makeDbLoadShark())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeLoadSharkFactory = () => {
  return new LoadSharkFactory()
}
