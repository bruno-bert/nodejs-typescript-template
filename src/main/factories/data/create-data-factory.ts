import {
  makeLogControllerDecorator,
  makeMetricsDecorator,
} from '@main/decorators'
import { Controller } from '@presentation/protocols'

import { CreateDataMongoRepository } from '@infra'
// import { CreateDataPrismaRepository } from '@infra'

import {
  DbCreateData,
  CreateDataRepositoryProtocol,
  CreateDataController,
  CreateDataProtocol,
} from '@usecases'

const makeMongoRepository = (): CreateDataRepositoryProtocol => {
  const repository = new CreateDataMongoRepository()
  return repository
}

const makeDatabaseRepository = (): CreateDataRepositoryProtocol => {
  switch (process.env.DATABASE_TYPE) {
    case 'MONGODB': {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(
        repository,
      ) as unknown as CreateDataRepositoryProtocol
    }
    // case 'PRISMA': {
    //   const repository = makePrismaRepository()
    //   return makeMetricsDecorator(repository) as CreateDataRepositoryProtocol
    // }
    default: {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(
        repository,
      ) as unknown as CreateDataRepositoryProtocol
    }
  }
}

export const makeDbCreateData = (): CreateDataProtocol => {
  const repository = makeDatabaseRepository()
  return new DbCreateData(repository)
}

export const makeCreateDataController = (): Controller => {
  const controller = new CreateDataController(makeDbCreateData())
  return makeLogControllerDecorator(controller)
}
