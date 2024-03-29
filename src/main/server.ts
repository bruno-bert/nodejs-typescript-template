import env from '@main/config/env'
import { MongoHelper } from '@infra'
import { startMetricsServer } from '@metrics/server'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`),
    )
    startMetricsServer()
  })
  .catch(console.error)
