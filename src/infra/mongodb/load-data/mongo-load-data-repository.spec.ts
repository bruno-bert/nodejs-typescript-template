import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { LoadDataMongoRepository } from './mongo-load-data-repository'
import { MongoHelper } from '../utils'
import { Collection } from 'mongodb'
import { mockAddDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadDataMongoRepository(),
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

describe('Test Suite for mongo-load-data-repository.spec', () => {
  test('Ensure that load data will return items', async () => {
    const addDataModels = [mockAddDataParams(), mockAddDataParams()]
    await dataCollection.insertMany(addDataModels)

    const { sut } = makeSut()
    const result = await sut.loadAll()

    expect(result.length).toEqual(2)
  })
})
