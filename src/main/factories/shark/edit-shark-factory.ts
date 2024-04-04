import { Controller } from '@presentation/protocols'

import { EditSharkMongoRepository } from '@infra/database/mongodb/shark'
import { EditSharkPrismaRepository } from '@infra/database/prisma/shark'

import {
  DbEditShark,
  EditSharkRepositoryProtocol,
  EditSharkController,
  EditSharkProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class EditSharkFactory extends AbstractFactory<EditSharkRepositoryProtocol> {
  makePrismaRepository = (): EditSharkRepositoryProtocol => {
    const repository = new EditSharkPrismaRepository()
    return repository
  }

  makeMongoRepository = (): EditSharkRepositoryProtocol => {
    const repository = new EditSharkMongoRepository()
    return repository
  }

  makeDbEditShark = (): EditSharkProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbEditShark(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new EditSharkController(this.makeDbEditShark())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeEditSharkFactory = () => {
  return new EditSharkFactory()
}
