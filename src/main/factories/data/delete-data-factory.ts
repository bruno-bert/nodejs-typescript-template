import {
  makeLogControllerDecorator,
  makeMetricsDecorator,
} from '@main/decorators'
import { Controller } from '@presentation/protocols'

import { DeleteDataMongoRepository } from '@infra'
// import { DeleteDataPrismaRepository } from '@infra'

import {
  DbDeleteData,
  DeleteDataController,
  DeleteDataProtocol,
  DeleteDataRepositoryProtocol,
} from '@usecases'

const makeMongoRepository = (): DeleteDataRepositoryProtocol => {
  const repository = new DeleteDataMongoRepository()
  return repository
}

const makeDatabaseRepository = (): DeleteDataRepositoryProtocol => {
  switch (process.env.DATABASE_TYPE) {
    case 'MONGODB': {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(
        repository,
      ) as unknown as DeleteDataRepositoryProtocol
    }
    // case 'PRISMA': {
    //   const repository = makePrismaRepository()
    //   return makeMetricsDecorator(repository) as DeleteDataRepositoryProtocol
    // }
    default: {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(
        repository,
      ) as unknown as DeleteDataRepositoryProtocol
    }
  }
}

export const makeDbDeleteData = (): DeleteDataProtocol => {
  const repository = makeDatabaseRepository()
  return new DbDeleteData(repository)
}

export const makeDeleteDataController = (): Controller => {
  const controller = new DeleteDataController(makeDbDeleteData())
  return makeLogControllerDecorator(controller)
}
