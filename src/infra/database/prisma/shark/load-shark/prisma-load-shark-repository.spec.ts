import { describe, expect, test, beforeEach } from 'vitest'
import { LoadSharkPrismaRepository } from './prisma-load-shark-repository'
import { prismaClient as prisma } from '../../utils'
import { mockCreateSharkParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadSharkPrismaRepository(),
  }
}

beforeEach(async () => {
  await prisma.shark.deleteMany({})
})

describe('Test Suite for prisma-load-shark-repository.spec', () => {
  test('Ensure that load shark will return items', async () => {
    await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })
    await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })

    const { sut } = makeSut()
    const result = await sut.loadAll()

    expect(result.length).toEqual(2)
  })
})
