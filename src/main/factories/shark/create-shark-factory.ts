import { Controller } from '@presentation/protocols'

import { CreateSharkMongoRepository } from '@infra/database/mongodb/shark'

import { CreateSharkPrismaRepository } from '@infra/database/prisma/shark'

import {
  DbCreateShark,
  CreateSharkRepositoryProtocol,
  CreateSharkController,
  CreateSharkProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class CreateSharkFactory extends AbstractFactory<CreateSharkRepositoryProtocol> {
  makePrismaRepository = (): CreateSharkRepositoryProtocol => {
    const repository = new CreateSharkPrismaRepository()
    return repository
  }

  makeMongoRepository = (): CreateSharkRepositoryProtocol => {
    const repository = new CreateSharkMongoRepository()
    return repository
  }

  makeDbCreateShark = (): CreateSharkProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbCreateShark(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new CreateSharkController(this.makeDbCreateShark())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeCreateSharkFactory = () => {
  return new CreateSharkFactory()
}
