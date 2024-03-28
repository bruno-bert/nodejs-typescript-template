import { adaptRoute } from '@main/adapters'
import { makeLoadOrderDetailFactory } from '@main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.get(
    '/order/:id',
    adaptRoute(makeLoadOrderDetailFactory().makeController()),
  )
}
