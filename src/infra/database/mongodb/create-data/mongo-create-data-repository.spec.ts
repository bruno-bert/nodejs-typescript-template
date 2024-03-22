import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { CreateDataMongoRepository } from './mongo-create-data-repository'
import { MongoHelper } from '../utils'
import { Collection } from 'mongodb'
import { mockCreateDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new CreateDataMongoRepository(),
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

describe('Test Suite for mongo-create-data-repository.spec', () => {
  test('Ensure that create data will return inserted params', async () => {
    const itemToInsert = mockCreateDataParams()
    const { sut } = makeSut()
    const result = await sut.create(itemToInsert)
    expect(result.date).toEqual(itemToInsert.date)
    expect(result.name).toEqual(itemToInsert.name)
    expect(result.welcomeMessage).toEqual(itemToInsert.welcomeMessage)
  })
})
