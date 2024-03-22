import {
  makeLogControllerDecorator,
  makeMetricsDecorator,
} from '@main/decorators'
import { Controller } from '@presentation/protocols'

import { LoadDataDetailMongoRepository } from '@infra'

import {
  DbLoadDataDetail,
  LoadDataDetailController,
  LoadDataDetailProtocol,
  LoadDataDetailRepositoryProtocol,
} from '@usecases'

const makeMongoRepository = (): LoadDataDetailRepositoryProtocol => {
  const repository = new LoadDataDetailMongoRepository()
  return repository
}

const makeDatabaseRepository = (): LoadDataDetailRepositoryProtocol => {
  switch (process.env.DATABASE_TYPE) {
    case 'MONGODB': {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(
        repository,
      ) as LoadDataDetailRepositoryProtocol
    }
    default: {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(
        repository,
      ) as LoadDataDetailRepositoryProtocol
    }
  }
}

export const makeDbLoadDataDetail = (): LoadDataDetailProtocol => {
  const repository = makeDatabaseRepository()
  return new DbLoadDataDetail(repository)
}

export const makeLoadDataDetailController = (): Controller => {
  const controller = new LoadDataDetailController(makeDbLoadDataDetail())
  return makeLogControllerDecorator(controller)
}
