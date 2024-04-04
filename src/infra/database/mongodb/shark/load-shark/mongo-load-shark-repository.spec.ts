import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { LoadSharkMongoRepository } from './mongo-load-shark-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateSharkParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadSharkMongoRepository(),
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

describe('Test Suite for mongo-load-shark-repository.spec', () => {
  test('Ensure that load shark will return items', async () => {
    const addSharkModels = [mockCreateSharkParams(), mockCreateSharkParams()]
    await SharkCollection.insertMany(addSharkModels)

    const { sut } = makeSut()
    const result = await sut.loadAll()

    expect(result.length).toEqual(2)
  })
})
