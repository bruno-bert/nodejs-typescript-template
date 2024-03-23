import { PrometheusDatabaseMetricsDecorator } from '@infra'
import env from '@main/config/env'

export const makeMetricsDecorator = (repository: any) => {
  switch (env.metricsType) {
    case 'PROMETHEUS': {
      const decorator = new PrometheusDatabaseMetricsDecorator(repository)
      return decorator
    }
    default: {
      const decorator = new PrometheusDatabaseMetricsDecorator(repository)
      return decorator
    }
  }
}
