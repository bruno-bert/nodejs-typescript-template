import { CsvDecoratorProtocol } from '@usecases'
import * as fastCsv from 'fast-csv'

export class FastCsvExporter implements CsvDecoratorProtocol {
  async fetch(data: any) {
    return fastCsv.write(data, { headers: true })
  }
}
