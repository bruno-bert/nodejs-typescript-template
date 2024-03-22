import { adaptRoute } from '@main/adapters'
import { makeEditDataController } from '@usecases'

import { Router } from 'express'

export default (router: Router): void => {
  router.put('/data/:id', adaptRoute(makeEditDataController()))
}
