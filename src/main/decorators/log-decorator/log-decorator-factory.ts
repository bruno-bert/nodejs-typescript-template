import { LogControllerDecorator } from './log-decorator-controller'
import { LogMongoRepository } from '@infra'
import { Controller } from '@presentation/protocols'

export const makeLogControllerDecorator = (
  controller: Controller,
): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
