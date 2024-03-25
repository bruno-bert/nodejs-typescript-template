import { adaptRoute } from '@main/adapters'
import { makeLoadEmployeeDetailFactory } from '@main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.get(
    '/employee/:id',
    adaptRoute(makeLoadEmployeeDetailFactory().makeController()),
  )
}
