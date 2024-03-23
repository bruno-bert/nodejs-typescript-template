import { adaptRoute } from '@main/adapters'
import { makeLoadDataPagingFactory } from '@usecases'
import { Router } from 'express'

export default (router: Router): void => {
  router.get(
    '/data/paging',
    adaptRoute(makeLoadDataPagingFactory().makeController()),
  )
}
