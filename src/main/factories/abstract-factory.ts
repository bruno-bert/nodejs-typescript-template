import env from '@main/config/env'
import {
  makeLogControllerDecorator,
  makeMetricsDecorator,
} from '@main/decorators'
import { Controller } from '@presentation/protocols'

import { ZodValidator } from '@infra/utils'
import { GenericValidator } from '@utils/generic-validator'

export abstract class AbstractFactory<RepositoryProtocol> {
  abstract makeMongoRepository(): RepositoryProtocol
  abstract makeController(): Controller

  makeDatabaseRepository = (): RepositoryProtocol => {
    switch (env.databaseType) {
      case 'MONGODB': {
        const repository = this.makeMongoRepository()
        return makeMetricsDecorator(repository) as unknown as RepositoryProtocol
      }
      // case 'PRISMA': {
      //   const repository = makePrismaRepository()
      //   return makeMetricsDecorator(repository) as RepositoryProtocol
      // }
      default: {
        const repository = this.makeMongoRepository()
        return makeMetricsDecorator(repository) as unknown as RepositoryProtocol
      }
    }
  }

  makeValidator = () => {
    switch (env.validatorType) {
      case 'ZOD': {
        return new ZodValidator()
      }
      default: {
        return new ZodValidator()
      }
    }
  }

  protected makeServiceInjections = (): {
    repository: RepositoryProtocol
    validator: GenericValidator
  } => {
    const repository = this.makeDatabaseRepository()
    const validator = this.makeValidator()
    return { repository, validator }
  }

  protected makeControllerWithDecorators = (
    controller: Controller,
  ): Controller => {
    let controllerWithDecorator: Controller = controller

    if (env.addLogDecorator) {
      controllerWithDecorator = makeLogControllerDecorator(controller)
    }

    return controllerWithDecorator
  }
}
