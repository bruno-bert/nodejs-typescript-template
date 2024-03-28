import { adaptRoute } from '@main/adapters'
import { makeLoadOrderPagingFactory } from '@main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.get(
    '/order/paging',
    adaptRoute(makeLoadOrderPagingFactory().makeController()),
  )
}
