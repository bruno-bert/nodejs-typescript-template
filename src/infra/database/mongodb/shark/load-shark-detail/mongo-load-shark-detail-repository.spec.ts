import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { LoadSharkDetailMongoRepository } from './mongo-load-shark-detail-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadSharkDetailMongoRepository(),
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

describe('Test Suite for mongo-load-shark-detail-repository.spec', () => {
  test('Ensure that load shark detail will return required id', async () => {
    const document = await SharkCollection.insertOne(mockCreateDataParams())
    const { sut } = makeSut()
    const id = String(document.insertedId)
    const result = await sut.loadById(id)
    expect(result.id).toEqual(document.insertedId)
  })
})
