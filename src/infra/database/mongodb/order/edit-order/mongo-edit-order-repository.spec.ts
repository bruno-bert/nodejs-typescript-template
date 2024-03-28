import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { EditOrderMongoRepository } from './mongo-edit-order-repository'
import { MongoHelper } from '../../utils'
import { Collection, ObjectId } from 'mongodb'
import { mockCreateOrderParams, mockEditOrderParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new EditOrderMongoRepository(),
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

describe('Test Suite for mongo-edit-order-repository.spec', () => {
  test('Ensure that edit order will return required id and updated params', async () => {
    const itemToInsert = mockCreateOrderParams()
    const document = await OrderCollection.insertOne(itemToInsert)
    const { sut } = makeSut()
    const id = String(document.insertedId)
    const item = mockEditOrderParams(id)
    const result = await sut.edit(id, item)

    expect(result.id).toEqual(new ObjectId(id))

    expect(result.orderId).toEqual(item.orderId)
    expect(result.manufacturerId).toEqual(item.manufacturerId)
    expect(result.purchaseDate).toEqual(item.purchaseDate)
    expect(result.productId).toEqual(item.productId)
  })
})
