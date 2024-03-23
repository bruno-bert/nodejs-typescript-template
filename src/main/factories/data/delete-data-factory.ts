import { Controller } from '@presentation/protocols'

import { DeleteDataMongoRepository } from '@infra'
// import { DeleteDataPrismaRepository } from '@infra'

import {
  DbDeleteData,
  DeleteDataRepositoryProtocol,
  DeleteDataController,
  DeleteDataProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class DeleteDataFactory extends AbstractFactory<DeleteDataRepositoryProtocol> {
  // makePrismaRepository = (): DeleteDataRepositoryProtocol => {
  //   const repository = new DeleteDataPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): DeleteDataRepositoryProtocol => {
    const repository = new DeleteDataMongoRepository()
    return repository
  }

  makeDbDeleteData = (): DeleteDataProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbDeleteData(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new DeleteDataController(this.makeDbDeleteData())
    return super.makeControllerWithDecorators(controller)
  }
}
