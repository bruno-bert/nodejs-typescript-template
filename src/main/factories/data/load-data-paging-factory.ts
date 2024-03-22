import {
  makeLogControllerDecorator,
  makeMetricsDecorator,
} from '@main/decorators'
import { Controller } from '@presentation/protocols'

import { LoadDataPagingMongoRepository } from '@infra'
// import { LoadDataPagingPrismaRepository } from '@infra'

import {
  DbLoadDataPaging,
  LoadDataPagingController,
  LoadDataPagingProtocol,
  LoadDataPagingRepositoryProtocol,
} from '@usecases'

const makeMongoRepository = (): LoadDataPagingRepositoryProtocol => {
  const repository = new LoadDataPagingMongoRepository()
  return repository
}

const makeDatabaseRepository = (): LoadDataPagingRepositoryProtocol => {
  switch (process.env.DATABASE_TYPE) {
    case 'MONGODB': {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(
        repository,
      ) as unknown as LoadDataPagingRepositoryProtocol
    }
    // case 'PRISMA': {
    //  const repository = makePrismaRepository()
    //  return makeMetricsDecorator(
    //    repository,
    //  ) as LoadDataPagingRepositoryProtocol
    // }
    default: {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(
        repository,
      ) as unknown as LoadDataPagingRepositoryProtocol
    }
  }
}

export const makeDbLoadDataPaging = (): LoadDataPagingProtocol => {
  const repository = makeDatabaseRepository()
  return new DbLoadDataPaging(repository)
}

export const makeLoadDataPagingController = (): Controller => {
  const controller = new LoadDataPagingController(makeDbLoadDataPaging())
  return makeLogControllerDecorator(controller)
}
