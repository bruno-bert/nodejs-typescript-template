import { adaptRoute } from '@main/adapters'
import { makeCreateDataFactory } from '@usecases'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/data', adaptRoute(makeCreateDataFactory().makeController()))
}
