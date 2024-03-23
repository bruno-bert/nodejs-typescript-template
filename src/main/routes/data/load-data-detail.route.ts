import { adaptRoute } from '@main/adapters'
import { makeLoadDataDetailFactory } from '@usecases'
import { Router } from 'express'

export default (router: Router): void => {
  router.get(
    '/data/:id',
    adaptRoute(makeLoadDataDetailFactory().makeController()),
  )
}
