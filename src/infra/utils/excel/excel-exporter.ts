import { ExcelDecoratorProtocol } from '@main/decorators/load-excel-decorator'
import ExcelJS from 'exceljs'
import flat from 'flat'

type PrintableColumn = {
  header: string
  key: string
  width: number
}

export class ExcelJsExporter implements ExcelDecoratorProtocol {
  async fetch(
    response: any,
    data: any,
    filename: string,
    printableColumns: PrintableColumn[],
  ): Promise<any> {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Data')

    if (printableColumns) worksheet.columns = printableColumns
    worksheet.addRows(
      data.map((row: any) => {
        return flat(row)
      }),
    )

    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}.xlsx`,
    )

    await workbook.xlsx.write(response)

    return response.end()
  }
}
