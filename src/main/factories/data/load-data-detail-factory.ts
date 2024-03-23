import { Controller } from '@presentation/protocols'

import { LoadDataDetailMongoRepository } from '@infra'
// import { LoadDataDetailPrismaRepository } from '@infra'

import {
  DbLoadDataDetail,
  LoadDataDetailRepositoryProtocol,
  LoadDataDetailController,
  LoadDataDetailProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadDataDetailFactory extends AbstractFactory<LoadDataDetailRepositoryProtocol> {
  // makePrismaRepository = (): LoadDataDetailRepositoryProtocol => {
  //   const repository = new LoadDataDetailPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): LoadDataDetailRepositoryProtocol => {
    const repository = new LoadDataDetailMongoRepository()
    return repository
  }

  makeDbLoadDataDetail = (): LoadDataDetailProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadDataDetail(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadDataDetailController(this.makeDbLoadDataDetail())
    return this.makeControllerWithDecorators(controller)
  }
}

export const makeLoadDataDetailFactory = () => {
  return new LoadDataDetailFactory()
}
