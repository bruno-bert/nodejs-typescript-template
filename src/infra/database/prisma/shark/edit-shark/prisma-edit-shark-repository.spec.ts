import { describe, expect, test, beforeEach } from 'vitest'
import { EditSharkPrismaRepository } from './prisma-edit-shark-repository'
import { prismaClient as prisma } from '../../utils'
import { mockCreateSharkParams, mockEditSharkParams } from '@test-mocks'
import { DatabaseEditSharkNotFoundError } from '@usecases/shark/edit-shark/errors'

const makeSut = () => {
  return {
    sut: new EditSharkPrismaRepository(),
  }
}

beforeEach(async () => {
  await prisma.shark.deleteMany({})
})

describe('Test Suite for prisma-edit-shark-repository.spec', () => {
  test('Ensure that edit shark will return required id and updated params', async () => {
    const record = await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })

    const { sut } = makeSut()

    const item = mockEditSharkParams(record.id)
    const result = await sut.edit(record.id, item)
    expect(result.id).toEqual(record.id)
    expect(result.name).toEqual(item.name)
    expect(result.date).toEqual(item.date)
    expect(result.welcomeMessage).toEqual(item.welcomeMessage)
  })

  test('Ensure that edit shark returns correct error when id is not found', async () => {
    await prisma.shark.create({
      data: mockCreateSharkParams() as any,
    })

    const { sut } = makeSut()
    const otherId = '1'
    const item = mockEditSharkParams(otherId)
    const promise = sut.edit(otherId, item)
    await expect(promise).rejects.toThrowError(DatabaseEditSharkNotFoundError)
  })
})
