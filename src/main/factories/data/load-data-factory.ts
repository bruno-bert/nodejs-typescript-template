import {
  makeLogControllerDecorator,
  makeMetricsDecorator,
} from '@main/decorators'
import { Controller } from '@presentation/protocols'

import { LoadDataMongoRepository } from '@infra'

import {
  DbLoadData,
  LoadDataController,
  LoadDataProtocol,
  LoadDataRepositoryProtocol,
} from '@usecases'

const makeMongoRepository = (): LoadDataRepositoryProtocol => {
  const repository = new LoadDataMongoRepository()
  return repository
}

const makeDatabaseRepository = (): LoadDataRepositoryProtocol => {
  switch (process.env.DATABASE_TYPE) {
    case 'MONGODB': {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(repository) as LoadDataRepositoryProtocol
    }
    default: {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(repository) as LoadDataRepositoryProtocol
    }
  }
}

export const makeDbLoadData = (): LoadDataProtocol => {
  const repository = makeDatabaseRepository()
  return new DbLoadData(repository)
}

export const makeLoadDataController = (): Controller => {
  const controller = new LoadDataController(makeDbLoadData())
  return makeLogControllerDecorator(controller)
}
