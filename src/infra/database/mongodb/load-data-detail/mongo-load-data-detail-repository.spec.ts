import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { LoadDataDetailMongoRepository } from './mongo-load-data-detail-repository'
import { MongoHelper } from '../utils'
import { Collection } from 'mongodb'
import { mockCreateDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadDataDetailMongoRepository(),
  }
}

let dataCollection: Collection

afterAll(async () => {
  await MongoHelper.disconnect()
})

beforeEach(async () => {
  await MongoHelper.connect((globalThis as any).__MONGO_URI__)
  dataCollection = await MongoHelper.getCollection('sales')
  await dataCollection.deleteMany({})
})

describe('Test Suite for mongo-load-data-detail-repository.spec', () => {
  test('Ensure that load data detail will return required id', async () => {
    const document = await dataCollection.insertOne(mockCreateDataParams())
    const { sut } = makeSut()
    const id = String(document.insertedId)
    const result = await sut.loadById(id)
    expect(result.id).toEqual(document.insertedId)
  })
})
