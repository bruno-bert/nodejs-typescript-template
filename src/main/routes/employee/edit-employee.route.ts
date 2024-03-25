import { adaptRoute } from '@main/adapters'
import { makeEditEmployeeFactory } from '@main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.put(
    '/employee/:id',
    adaptRoute(makeEditEmployeeFactory().makeController()),
  )
}
