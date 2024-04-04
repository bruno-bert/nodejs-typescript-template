import { SharkModel } from '@usecases'

export interface LoadSharkPagingProtocol {
  loadPaging: (
    params: LoadSharkPagingProtocol.Params,
  ) => Promise<LoadSharkPagingProtocol.Result>
}

export namespace LoadSharkPagingProtocol {
  export type PrintableColumn = {
    header: string
    key: string
    width: number
  }
  export type Params = {
    usePagination: boolean
    sortDefaultField: string
    originalUrl: string
    query: {
      page: number
      count: number
    }
    body: {
      filters: any
      orderBy: any
      select: any
      include: any
      printableColumns: PrintableColumn[]
    }
  }
  export type Result = {
    data: SharkModel[] | null
    metadata: {
      page: number
      itemsPerPage: number
      totalRecords: number
      nextPageUrl: string | null
    } | null
  }
}
