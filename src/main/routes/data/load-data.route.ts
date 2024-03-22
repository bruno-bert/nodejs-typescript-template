import { adaptRoute } from '@main/adapters'
import { makeLoadDataController } from '@main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/data', adaptRoute(makeLoadDataController()))
}
