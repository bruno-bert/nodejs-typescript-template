export interface ExcelDecoratorProtocol {
  fetch(
    response: any,
    data: any,
    filename: string,
    printableColumns?: any,
  ): Promise<any>
}
