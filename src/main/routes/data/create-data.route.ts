import { adaptRoute } from '@main/adapters'
import { makeCreateDataController } from '@usecases'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/data', adaptRoute(makeCreateDataController()))
}
