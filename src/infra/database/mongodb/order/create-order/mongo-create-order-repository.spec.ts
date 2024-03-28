import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { CreateOrderMongoRepository } from './mongo-create-order-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateOrderParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new CreateOrderMongoRepository(),
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

describe('Test Suite for mongo-create-order-repository.spec', () => {
  test('Ensure that create -order will return inserted params', async () => {
    const item = mockCreateOrderParams()
    const { sut } = makeSut()
    const result = await sut.create(item)

    expect(result.orderId).toEqual(item.orderId)
    expect(result.manufacturerId).toEqual(item.manufacturerId)
    expect(result.purchaseDate).toEqual(item.purchaseDate)
    expect(result.productId).toEqual(item.productId)
  })
})
