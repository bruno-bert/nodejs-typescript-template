import { Controller } from '@presentation/protocols'

import { EditDataMongoRepository } from '@infra'
// import { EditDataPrismaRepository } from '@infra'

import {
  DbEditData,
  EditDataRepositoryProtocol,
  EditDataController,
  EditDataProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class EditDataFactory extends AbstractFactory<EditDataRepositoryProtocol> {
  // makePrismaRepository = (): EditDataRepositoryProtocol => {
  //   const repository = new EditDataPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): EditDataRepositoryProtocol => {
    const repository = new EditDataMongoRepository()
    return repository
  }

  makeDbEditData = (): EditDataProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbEditData(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new EditDataController(this.makeDbEditData())
    return super.makeControllerWithDecorators(controller)
  }
}
