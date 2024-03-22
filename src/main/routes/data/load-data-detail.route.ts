import { adaptRoute } from '@main/adapters'
import { makeLoadDataDetailController } from '@main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/data/:id', adaptRoute(makeLoadDataDetailController()))
}
