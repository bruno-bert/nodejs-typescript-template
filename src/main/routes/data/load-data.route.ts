import { adaptRoute } from '@main/adapters'
import { makeLoadDataFactory } from '@usecases'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/data', adaptRoute(makeLoadDataFactory().makeController()))
}
