import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { LoadDataPagingMongoRepository } from './mongo-load-data-paging-repository'
import { MongoHelper } from '../utils'
import { Collection } from 'mongodb'
import { mockCreateDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadDataPagingMongoRepository(),
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

describe('Test Suite for mongo-load-data-paging-repository.spec', () => {
  test('Ensure that load data paging will return items', async () => {
    const addDataModels = [mockCreateDataParams(), mockCreateDataParams()]
    await dataCollection.insertMany(addDataModels)

    const { sut } = makeSut()
    const result = await sut.loadPaging()

    expect(result.length).toEqual(2)
  })
})
