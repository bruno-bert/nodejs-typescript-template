import { adaptRoute } from '@main/adapters'
import { makeDeleteSharkFactory } from '@main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.delete(
    '/shark/:id',
    adaptRoute(makeDeleteSharkFactory().makeController()),
  )
}
