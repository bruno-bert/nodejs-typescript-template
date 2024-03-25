import { adaptRoute } from '@main/adapters'
import { makeDeleteEmployeeFactory } from '@main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.delete(
    '/employee/:id',
    adaptRoute(makeDeleteEmployeeFactory().makeController()),
  )
}
