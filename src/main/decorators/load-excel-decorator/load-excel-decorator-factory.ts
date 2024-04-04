import { Controller } from '@presentation/protocols'
import { ExcelGeneratorController } from './load-excel-decorator-controller'
import { ExcelJsExporter } from '@infra/utils/excel'

export const makeLoadExcelController = (controller: Controller): Controller => {
  const loadCsvDecorator = new ExcelJsExporter()
  return new ExcelGeneratorController(controller, loadCsvDecorator)
}
