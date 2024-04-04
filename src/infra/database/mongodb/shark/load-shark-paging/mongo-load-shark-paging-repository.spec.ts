import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { LoadSharkPagingMongoRepository } from './mongo-load-shark-paging-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateSharkParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadSharkPagingMongoRepository(),
  }
}

let SharkCollection: Collection

afterAll(async () => {
  await MongoHelper.disconnect()
})

beforeEach(async () => {
  await MongoHelper.connect((globalThis as any).__MONGO_URI__)
  SharkCollection = await MongoHelper.getCollection('shark')
  await SharkCollection.deleteMany({})
})

describe('Test Suite for mongo-load-shark-paging-repository.spec', () => {
  test('Ensure that load shark paging will return items', async () => {
    const addSharkModels = [mockCreateSharkParams(), mockCreateSharkParams()]
    await SharkCollection.insertMany(addSharkModels)

    const { sut } = makeSut()
    const result = await sut.loadPaging()

    expect(result.length).toEqual(2)
  })
})
