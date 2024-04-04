import { describe, expect, test, beforeEach } from 'vitest'
import { LoadSharkDetailPrismaRepository } from './prisma-load-shark-detail-repository'
import { prismaClient as prisma } from '../../utils'
import { mockCreateSharkParams } from '@test-mocks'
import { DatabaseLoadSharkDetailNotFoundError } from '@usecases/shark/load-shark-detail/errors'

const makeSut = () => {
  return {
    sut: new LoadSharkDetailPrismaRepository(),
  }
}

beforeEach(async () => {
  await prisma.shark.deleteMany({})
})

describe('Test Suite for prisma-load-shark-detail-repository.spec', () => {
  test('Ensure that load shark detail will return required id', async () => {
    const record = await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })

    const { sut } = makeSut()
    const result = await sut.loadById(record.id)
    expect(result.id).toEqual(record.id)
  })

  test('Ensure that edit shark returns correct error when id is not found', async () => {
    await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })

    const { sut } = makeSut()
    const otherId = '1'
    const promise = sut.loadById(otherId)
    await expect(promise).rejects.toThrowError(
      DatabaseLoadSharkDetailNotFoundError,
    )
  })
})
