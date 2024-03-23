import { Controller } from '@presentation/protocols'

import { LoadDataPagingMongoRepository } from '@infra'
// import { LoadDataPagingPrismaRepository } from '@infra'

import {
  DbLoadDataPaging,
  LoadDataPagingRepositoryProtocol,
  LoadDataPagingController,
  LoadDataPagingProtocol,
} from '@usecases'
import { AbstractFactory } from '../abstract-factory'

export class LoadDataPagingFactory extends AbstractFactory<LoadDataPagingRepositoryProtocol> {
  // makePrismaRepository = (): LoadDataPagingRepositoryProtocol => {
  //   const repository = new LoadDataPagingPrismaRepository()
  //   return repository
  // }

  makeMongoRepository = (): LoadDataPagingRepositoryProtocol => {
    const repository = new LoadDataPagingMongoRepository()
    return repository
  }

  makeDbLoadDataPaging = (): LoadDataPagingProtocol => {
    const { repository, validator } = this.makeServiceInjections()
    return new DbLoadDataPaging(repository, validator)
  }

  makeController = (): Controller => {
    const controller = new LoadDataPagingController(this.makeDbLoadDataPaging())
    return super.makeControllerWithDecorators(controller)
  }
}
