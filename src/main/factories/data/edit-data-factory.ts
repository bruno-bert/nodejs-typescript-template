import {
  makeLogControllerDecorator,
  makeMetricsDecorator,
} from '@main/decorators'
import { Controller } from '@presentation/protocols'

import { EditDataMongoRepository } from '@infra'
// import { EditDataPrismaRepository } from '@infra'

import {
  DbEditData,
  EditDataController,
  EditDataProtocol,
  EditDataRepositoryProtocol,
} from '@usecases'

const makeMongoRepository = (): EditDataRepositoryProtocol => {
  const repository = new EditDataMongoRepository()
  return repository
}

const makeDatabaseRepository = (): EditDataRepositoryProtocol => {
  switch (process.env.DATABASE_TYPE) {
    case 'MONGODB': {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(
        repository,
      ) as unknown as EditDataRepositoryProtocol
    }
    // case 'PRISMA': {
    //   const repository = makePrismaRepository()
    //   return makeMetricsDecorator(repository) as EditDataRepositoryProtocol
    // }
    default: {
      const repository = makeMongoRepository()
      return makeMetricsDecorator(
        repository,
      ) as unknown as EditDataRepositoryProtocol
    }
  }
}

export const makeDbEditData = (): EditDataProtocol => {
  const repository = makeDatabaseRepository()
  return new DbEditData(repository)
}

export const makeEditDataController = (): Controller => {
  const controller = new EditDataController(makeDbEditData())
  return makeLogControllerDecorator(controller)
}
