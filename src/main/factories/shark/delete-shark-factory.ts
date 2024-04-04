import { Controller } from '@presentation/protocols'

import { DeleteSharkMongoRepository } from '@infra/database/mongodb/shark'
import { DeleteSharkPrismaRepository } from '@infra/database/prisma/shark'

import {
  DbDeleteShark,
  DeleteSharkRepositoryProtocol,
  DeleteSharkController,
  DeleteSharkProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class DeleteSharkFactory extends AbstractFactory<DeleteSharkRepositoryProtocol> {
  makePrismaRepository = (): DeleteSharkRepositoryProtocol => {
    const repository = new DeleteSharkPrismaRepository()
    return repository
  }

  makeMongoRepository = (): DeleteSharkRepositoryProtocol => {
    const repository = new DeleteSharkMongoRepository()
    return repository
  }

  makeDbDeleteShark = (): DeleteSharkProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbDeleteShark(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new DeleteSharkController(this.makeDbDeleteShark())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeDeleteSharkFactory = () => {
  return new DeleteSharkFactory()
}
