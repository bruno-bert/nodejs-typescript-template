import { adaptRoute } from '@main/adapters'
import { makeLoadDataPagingController } from '@usecases'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/data/paging', adaptRoute(makeLoadDataPagingController()))
}
