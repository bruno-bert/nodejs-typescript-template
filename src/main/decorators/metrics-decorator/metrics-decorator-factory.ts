import { PrometheusDatabaseMetricsDecorator } from '@infra'

export const makeMetricsDecorator = (repository: any) => {
  switch (process.env.METRICS_TYPE) {
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
