import { adaptRoute } from '@main/adapters'
import { makeLoadOrderFactory } from '@main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/order', adaptRoute(makeLoadOrderFactory().makeController()))
}
