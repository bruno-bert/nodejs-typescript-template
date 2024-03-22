import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { EditDataMongoRepository } from './mongo-edit-data-repository'
import { MongoHelper } from '../utils'
import { Collection, ObjectId } from 'mongodb'
import { mockCreateDataParams, mockEditDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new EditDataMongoRepository(),
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

describe('Test Suite for mongo-edit-data-repository.spec', () => {
  test('Ensure that edit data will return required id and updated params', async () => {
    const itemToInsert = mockCreateDataParams()
    const document = await dataCollection.insertOne(itemToInsert)
    const { sut } = makeSut()
    const id = String(document.insertedId)
    const itemToUpdate = mockEditDataParams(id)
    const result = await sut.edit(id, itemToUpdate)
    expect(result.id).toEqual(new ObjectId(id))
    expect(result.date).toEqual(itemToUpdate.date)
    expect(result.name).toEqual(itemToUpdate.name)
    expect(result.welcomeMessage).toEqual(itemToUpdate.welcomeMessage)
  })
})
