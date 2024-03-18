import { makeLogControllerDecorator } from '@main/decorators'
import { Controller } from '@presentation/protocols'
import { LoadDataController } from './load-data-controller'

import { LoadDataMongoRepository } from '@infra'
import { LoadDataProtocol } from './protocols'
import { DbLoadData, LoadDataRepositoryProtocol } from '@usecases'

const makeMongoRepository = (): LoadDataRepositoryProtocol => {
  const repository = new LoadDataMongoRepository()
  return repository
}

const makeInfrastructureRepository = (): LoadDataRepositoryProtocol => {
  switch (process.env.DATABASE_TYPE) {
    case 'MONGODB':
      return makeMongoRepository()
    default:
      return makeMongoRepository()
  }
}

export const makeDbLoadData = (): LoadDataProtocol => {
  const repository = makeInfrastructureRepository()
  return new DbLoadData(repository)
}

export const makeLoadDataController = (): Controller => {
  const controller = new LoadDataController(makeDbLoadData())
  return makeLogControllerDecorator(controller)
}
