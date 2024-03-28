import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { DeleteOrderMongoRepository } from './mongo-delete-order-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new DeleteOrderMongoRepository(),
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

describe('Test Suite for mongo-delete-order-repository.spec', () => {
  test('Ensure that delete order will return correct count of deleted record', async () => {
    let item = mockCreateDataParams()
    let document = await OrderCollection.insertOne(item)
    item = mockCreateDataParams()
    document = await OrderCollection.insertOne(item)

    const { sut } = makeSut()
    const id = String(document.insertedId)
    const result = await sut.delete({ id })
    expect(result.success).toEqual(true)
    expect(result.count).toEqual(1)
  })
})
