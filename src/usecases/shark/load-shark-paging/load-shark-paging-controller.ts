import { Controller, HttpResponse } from '@presentation/protocols'
import { noContent, ok } from '@presentation/helpers'
import { LoadSharkPagingProtocol } from './protocols'
import { errorToHttpResponse } from '@utils/error-handler'

export class LoadSharkPagingController implements Controller {
  constructor(private readonly LoadSharkPaging: LoadSharkPagingProtocol) {}

  async map(
    request: LoadSharkPagingController.Request,
  ): Promise<LoadSharkPagingProtocol.Params> {
    return {
      usePagination: request.count !== undefined || false,
      sortDefaultField: request.sortDefaultField || 'id',
      originalUrl: request.originalUrl,
      query: {
        page: request.page || 1,
        count: request.count || 10,
      },
      body: {
        filters: request.filters,
        orderBy: request.orderBy,
        select: request.select,
        include: request.include,
        printableColumns: request.printableColumns,
      },
    }
  }

  async handle(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: LoadSharkPagingController.Request,
  ): Promise<HttpResponse> {
    try {
      const params = await this.map(request)

      const data = await this.LoadSharkPaging.loadPaging(params)
      return data?.data ? ok(data) : noContent()
    } catch (error: any) {
      return errorToHttpResponse(error)
    }
  }
}

export namespace LoadSharkPagingController {
  export type Request = {
    page: number
    count: number
    originalUrl: string
    filters: any
    orderBy: any
    select: any
    include: any
    printableColumns: any[]
    sortDefaultField: string
  }
}
