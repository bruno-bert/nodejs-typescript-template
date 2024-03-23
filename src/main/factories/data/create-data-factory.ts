import { Controller } from '@presentation/protocols'

import { CreateDataMongoRepository } from '@infra'
// import { CreateDataPrismaRepository } from '@infra'

import {
  DbCreateData,
  CreateDataRepositoryProtocol,
  CreateDataController,
  CreateDataProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class CreateDataFactory extends AbstractFactory<CreateDataRepositoryProtocol> {
  // makePrismaRepository = (): CreateDataRepositoryProtocol => {
  //   const repository = new CreateDataPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): CreateDataRepositoryProtocol => {
    const repository = new CreateDataMongoRepository()
    return repository
  }

  makeDbCreateData = (): CreateDataProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbCreateData(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new CreateDataController(this.makeDbCreateData())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeCreateDataFactory = () => {
  return new CreateDataFactory()
}
