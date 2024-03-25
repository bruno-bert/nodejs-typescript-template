import { adaptRoute } from '@main/adapters'
import { makeDeleteDataFactory } from '@main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.delete(
    '/data/:id',
    adaptRoute(makeDeleteDataFactory().makeController()),
  )
}
