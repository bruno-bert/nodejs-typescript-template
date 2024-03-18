import { makeLogControllerDecorator } from '@main/decorators'
import { Controller } from '@presentation/protocols'
import { LoadDataDetailController } from './load-data-detail-controller'

import { LoadDataDetailMongoRepository } from '@infra'
import { LoadDataDetailProtocol } from './protocols'
import { DbLoadDataDetail, LoadDataDetailRepositoryProtocol } from '@usecases'

const makeMongoRepository = (): LoadDataDetailRepositoryProtocol => {
  const repository = new LoadDataDetailMongoRepository()
  return repository
}

const makeInfrastructureRepository = (): LoadDataDetailRepositoryProtocol => {
  switch (process.env.DATABASE_TYPE) {
    case 'MONGODB':
      return makeMongoRepository()
    default:
      return makeMongoRepository()
  }
}

export const makeDbLoadDataDetail = (): LoadDataDetailProtocol => {
  const repository = makeInfrastructureRepository()
  return new DbLoadDataDetail(repository)
}

export const makeLoadDataDetailController = (): Controller => {
  const controller = new LoadDataDetailController(makeDbLoadDataDetail())
  return makeLogControllerDecorator(controller)
}
