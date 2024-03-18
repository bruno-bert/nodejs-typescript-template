import { adaptRoute } from '@main/adapters'
import { makeLoadDataController } from '@usecases/load-data'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/data', adaptRoute(makeLoadDataController()))
}
