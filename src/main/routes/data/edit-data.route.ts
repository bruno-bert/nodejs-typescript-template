import { adaptRoute } from '@main/adapters'
import { makeEditDataFactory } from '@usecases'

import { Router } from 'express'

export default (router: Router): void => {
  router.put('/data/:id', adaptRoute(makeEditDataFactory().makeController()))
}
