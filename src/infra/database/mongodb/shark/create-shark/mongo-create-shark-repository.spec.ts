import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { CreateSharkMongoRepository } from './mongo-create-shark-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateSharkParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new CreateSharkMongoRepository(),
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

describe('Test Suite for mongo-create-shark-repository.spec', () => {
  test('Ensure that create -shark will return inserted params', async () => {
    const item = mockCreateSharkParams()
    const { sut } = makeSut()
    const result = await sut.create(item)

    expect(result.name).toEqual(item.name)
    expect(result.date).toEqual(item.date)
    expect(result.welcomeMessage).toEqual(item.welcomeMessage)
  })
})
