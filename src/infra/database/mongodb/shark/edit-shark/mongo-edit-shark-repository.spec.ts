import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { EditSharkMongoRepository } from './mongo-edit-shark-repository'
import { MongoHelper } from '../../utils'
import { Collection, ObjectId } from 'mongodb'
import { mockCreateSharkParams, mockEditSharkParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new EditSharkMongoRepository(),
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

describe('Test Suite for mongo-edit-shark-repository.spec', () => {
  test('Ensure that edit shark will return required id and updated params', async () => {
    const itemToInsert = mockCreateSharkParams()
    const document = await SharkCollection.insertOne(itemToInsert)
    const { sut } = makeSut()
    const id = String(document.insertedId)
    const item = mockEditSharkParams(id)
    const result = await sut.edit(id, item)

    expect(result.id).toEqual(new ObjectId(id))

    expect(result.name).toEqual(item.name)
    expect(result.date).toEqual(item.date)
    expect(result.welcomeMessage).toEqual(item.welcomeMessage)
  })
})
