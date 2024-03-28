import { adaptRoute } from '@main/adapters'
import { makeDeleteOrderFactory } from '@main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.delete(
    '/order/:id',
    adaptRoute(makeDeleteOrderFactory().makeController()),
  )
}
