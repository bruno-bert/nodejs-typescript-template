import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { LoadOrderDetailMongoRepository } from './mongo-load-order-detail-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadOrderDetailMongoRepository(),
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

describe('Test Suite for mongo-load-order-detail-repository.spec', () => {
  test('Ensure that load order detail will return required id', async () => {
    const document = await OrderCollection.insertOne(mockCreateDataParams())
    const { sut } = makeSut()
    const id = String(document.insertedId)
    const result = await sut.loadById(id)
    expect(result.id).toEqual(document.insertedId)
  })
})
