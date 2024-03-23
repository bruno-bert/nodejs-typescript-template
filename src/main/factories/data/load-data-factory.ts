import { Controller } from '@presentation/protocols'

import { LoadDataMongoRepository } from '@infra'
// import { LoadDataPrismaRepository } from '@infra'

import {
  DbLoadData,
  LoadDataRepositoryProtocol,
  LoadDataController,
  LoadDataProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadDataFactory extends AbstractFactory<LoadDataRepositoryProtocol> {
  // makePrismaRepository = (): LoadDataRepositoryProtocol => {
  //   const repository = new LoadDataPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): LoadDataRepositoryProtocol => {
    const repository = new LoadDataMongoRepository()
    return repository
  }

  makeDbLoadData = (): LoadDataProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadData(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadDataController(this.makeDbLoadData())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeLoadDataFactory = () => {
  return new LoadDataFactory()
}
