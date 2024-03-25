import { adaptRoute } from '@main/adapters'
import { makeLoadEmployeePagingFactory } from '@main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.get(
    '/employee/paging',
    adaptRoute(makeLoadEmployeePagingFactory().makeController()),
  )
}
