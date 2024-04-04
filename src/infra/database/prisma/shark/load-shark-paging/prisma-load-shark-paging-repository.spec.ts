import { describe, expect, test, beforeEach } from 'vitest'
import { LoadSharkPagingPrismaRepository } from './prisma-load-shark-paging-repository'
import { prismaClient as prisma } from '../../utils'
import { mockCreateSharkPagingParams, mockCreateSharkParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadSharkPagingPrismaRepository(),
  }
}

beforeEach(async () => {
  await prisma.shark.deleteMany({})
})

describe('Test Suite for prisma-load-shark-paging-repository.spec', () => {
  test('Ensure that load shark paging will return items', async () => {
    await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })
    await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })

    const { sut } = makeSut()
    const params = mockCreateSharkPagingParams()
    const result = await sut.loadPaging(params)

    expect(result.data.length).toEqual(2)
  })

  test('Ensure that load shark paging will filter correctly - no items returned', async () => {
    await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })
    await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })

    const { sut } = makeSut()
    const params = mockCreateSharkPagingParams()
    params.body.filters = {
      id: 'any-non-existing-id',
    }
    const result = await sut.loadPaging(params)

    expect(result.data.length).toEqual(0)
  })

  test('Ensure that load shark paging will filter correctly - one item', async () => {
    const item = await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })
    await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })

    const { sut } = makeSut()
    const params = mockCreateSharkPagingParams()
    params.body.filters = {
      id: item.id,
    }
    const result = await sut.loadPaging(params)

    expect(result.data.length).toEqual(1)
  })

  test('Ensure that load shark paging will paginate correctly', async () => {
    const totalItems = 10
    const perPage = 2

    for (let i = 0; i < totalItems; i++) {
      await prisma.shark.create({
        data: mockCreateSharkParams() as any,
      })
    }

    const { sut } = makeSut()
    const params = mockCreateSharkPagingParams()
    params.usePagination = true
    params.query = {
      page: 1,
      count: perPage,
    }

    const result = await sut.loadPaging(params)

    expect(result.metadata.page).toEqual(1)
    expect(result.metadata.itemsPerPage).toEqual(2)
    expect(result.metadata.totalRecords).toEqual(totalItems)
    expect(result.data.length).toEqual(perPage)
  })
})
