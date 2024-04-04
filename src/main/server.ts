import env from '@main/config/env'
import { MongoHelper } from '@infra'
import { startMetricsServer } from '@metrics/server'

switch (env.databaseType) {
  case 'MONGODB': {
    MongoHelper.connect(env.mongoUrl)
      .then(async () => {
        const app = (await import('./config/app')).default
        app.listen(env.port, () =>
          console.log(`Server running at http://localhost:${env.port}`),
        )
        startMetricsServer()
      })
      .catch(console.error)
    break
  }

  case 'PRISMA': {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const app = require('./config/app').default
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`),
    )
    startMetricsServer()

    break
  }

  default:
    break
}
