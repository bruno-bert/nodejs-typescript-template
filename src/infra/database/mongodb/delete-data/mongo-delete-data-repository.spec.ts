import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { DeleteDataMongoRepository } from './mongo-delete-data-repository'
import { MongoHelper } from '../utils'
import { Collection } from 'mongodb'
import { mockCreateDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new DeleteDataMongoRepository(),
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

describe('Test Suite for mongo-delete-data-repository.spec', () => {
  test('Ensure that delete data will return correct count of deleted record', async () => {
    let itemToInsert = mockCreateDataParams()
    let document = await dataCollection.insertOne(itemToInsert)
    itemToInsert = mockCreateDataParams()
    document = await dataCollection.insertOne(itemToInsert)

    const { sut } = makeSut()
    const id = String(document.insertedId)
    const result = await sut.delete({ id })
    expect(result.success).toEqual(true)
    expect(result.count).toEqual(1)
  })
})
