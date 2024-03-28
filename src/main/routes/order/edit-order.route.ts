import { adaptRoute } from '@main/adapters'
import { makeEditOrderFactory } from '@main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.put('/order/:id', adaptRoute(makeEditOrderFactory().makeController()))
}
