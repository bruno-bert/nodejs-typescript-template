import { PrismaClient } from '@prisma/client'

export type ResultData = {
  data: any[]
  metadata: {
    page: number
    itemsPerPage: number
    totalRecords: number
    nextPageUrl: string | null
  }
}

const prisma = new PrismaClient()

class DBClient {
  private static prismaInstance: PrismaClient | null = null

  static getPrismaClient(): PrismaClient {
    if (!this.prismaInstance) {
      this.prismaInstance = prisma
    }
    return this.prismaInstance
  }
}

export const prismaClient = DBClient.getPrismaClient()

export const PrismaHelper = {
  map: (data: any): any => {
    return data
  },

  mapCollection: (items: any[]): any[] => {
    return items.map((item) => PrismaHelper.map(item))
  },

  fetchData: async (
    req: any,
    model: string,
    usePagination: boolean = true,
    sortDefaultField: string = 'id',
  ): Promise<ResultData> => {
    const sortDefaultDirection = 'desc'
    const page = req.query?.page ? Number(req.query?.page) : 1
    const itemsPerPage = req.query?.count ? Number(req.query?.count) : 10
    const filters = req.body?.filters ? req.body?.filters : undefined
    const orderBy = req.body?.orderBy
      ? req.body?.orderBy
      : [{ [sortDefaultField]: sortDefaultDirection }]
    const select = req.body?.select ? req.body?.select : undefined
    const include = req.body?.include ? req.body?.include : undefined

    const skip = usePagination ? (page - 1) * itemsPerPage : undefined
    const take = usePagination ? itemsPerPage : undefined

    const totalRecords = await (prismaClient as any)[model].count({
      where: filters,
    })

    const nextPage = page * itemsPerPage < totalRecords ? page + 1 : null
    const nextPageUrl = nextPage
      ? `${req.originalUrl}?page=${nextPage}&count=${itemsPerPage}`
      : null

    const data = await (prismaClient as any)[model].findMany({
      select,
      include,
      orderBy,
      where: filters,
      skip,
      take,
    })

    const metadata = {
      page,
      itemsPerPage,
      totalRecords,
      currentPageRecords: data ? data.length : 0,
      nextPageUrl,
    }

    return { data, metadata }
  },
}
