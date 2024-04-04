import { describe, expect, test, beforeEach } from 'vitest'
import { DeleteSharkPrismaRepository } from './prisma-delete-shark-repository'
import { prismaClient as prisma } from '../../utils'
import { mockCreateSharkParams } from '@test-mocks'
import { DatabaseDeleteSharkNotFoundError } from '@usecases/shark/delete-shark/errors'

const makeSut = () => {
  return {
    sut: new DeleteSharkPrismaRepository(),
  }
}

beforeEach(async () => {
  await prisma.shark.deleteMany({})
})

describe('Test Suite for prisma-delete-shark-repository.spec', () => {
  test('Ensure that delete shark will return correct count of deleted record', async () => {
    const record = await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })

    const { sut } = makeSut()

    const result = await sut.delete({ id: record.id })

    expect(result.success).toEqual(true)
    expect(result.count).toEqual(1)
    expect(result.item).toEqual(record)
  })

  test('Ensure that delete shark returns correct error when id is not found', async () => {
    await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })

    const { sut } = makeSut()
    const otherId = '1'

    const promise = sut.delete({ id: otherId })
    await expect(promise).rejects.toThrowError(DatabaseDeleteSharkNotFoundError)
  })
})
