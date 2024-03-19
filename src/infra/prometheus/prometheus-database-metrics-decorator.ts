import { databaseResponseTimeHistogram } from '@metrics/server'

export class PrometheusDatabaseMetricsDecorator {
  constructor(private readonly repository: any) {}

  loadAll(): Promise<any> {
    const metricsLabels = {
      operation: this.loadAll.name,
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
      const result = this.repository.loadAll()
      timer({ ...metricsLabels, success: 'true' })
      return result
    } catch (error) {
      timer({ ...metricsLabels, success: 'false' })
      throw error
    }
  }

  loadById(id: string): Promise<any> {
    const metricsLabels = {
      operation: this.loadById.name,
    }
    const timer = databaseResponseTimeHistogram.startTimer()

    try {
      const result = this.repository.loadById(id)
      timer({ ...metricsLabels, success: 'true' })
      return result
    } catch (error) {
      timer({ ...metricsLabels, success: 'false' })
      throw error
    }
  }
}
