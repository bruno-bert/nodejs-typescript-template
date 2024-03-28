import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { LoadOrderMongoRepository } from './mongo-load-order-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateOrderParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadOrderMongoRepository(),
  }
}

let OrderCollection: Collection

afterAll(async () => {
  await MongoHelper.disconnect()
})

beforeEach(async () => {
  await MongoHelper.connect((globalThis as any).__MONGO_URI__)
  OrderCollection = await MongoHelper.getCollection('order')
  await OrderCollection.deleteMany({})
})

describe('Test Suite for mongo-load-order-repository.spec', () => {
  test('Ensure that load order will return items', async () => {
    const addOrderModels = [mockCreateOrderParams(), mockCreateOrderParams()]
    await OrderCollection.insertMany(addOrderModels)

    const { sut } = makeSut()
    const result = await sut.loadAll()

    expect(result.length).toEqual(2)
  })
})
