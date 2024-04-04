import { Controller } from '@presentation/protocols'
import { CsvGeneratorController } from './load-csv-decorator-controller'
import { FastCsvExporter } from '@infra/utils/csv'

export const makeLoadCsvController = (controller: Controller): Controller => {
  const loadCsvDecorator = new FastCsvExporter()
  return new CsvGeneratorController(controller, loadCsvDecorator)
}
