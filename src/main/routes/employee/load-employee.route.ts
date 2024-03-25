import { adaptRoute } from '@main/adapters'
import { makeLoadEmployeeFactory } from '@main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.get(
    '/employee',
    adaptRoute(makeLoadEmployeeFactory().makeController()),
  )
}
