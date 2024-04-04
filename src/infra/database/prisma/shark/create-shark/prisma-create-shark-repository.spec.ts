import { describe, expect, test, beforeEach } from 'vitest'
import { CreateSharkPrismaRepository } from './prisma-create-shark-repository'
import { prismaClient as prisma } from '../../utils'

import { mockCreateSharkParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new CreateSharkPrismaRepository(),
  }
}

beforeEach(async () => {
  await prisma.shark.deleteMany({})
})

describe('Test Suite for prisma-create-shark-repository.spec', () => {
  test('Ensure that create-shark will return inserted params', async () => {
    const item = mockCreateSharkParams()
    const { sut } = makeSut()
    const result = await sut.create(item)

    expect(result.name).toEqual(item.name)
    expect(result.date).toEqual(item.date)
    expect(result.welcomeMessage).toEqual(item.welcomeMessage)
  })
})
