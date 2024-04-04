import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { DeleteSharkMongoRepository } from './mongo-delete-shark-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new DeleteSharkMongoRepository(),
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

describe('Test Suite for mongo-delete-shark-repository.spec', () => {
  test('Ensure that delete shark will return correct count of deleted record', async () => {
    let item = mockCreateDataParams()
    let document = await SharkCollection.insertOne(item)
    item = mockCreateDataParams()
    document = await SharkCollection.insertOne(item)

    const { sut } = makeSut()
    const id = String(document.insertedId)
    const result = await sut.delete({ id })
    expect(result.success).toEqual(true)
    expect(result.count).toEqual(1)
  })
})
