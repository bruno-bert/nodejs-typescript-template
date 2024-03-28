import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { EditEmployeeMongoRepository } from './mongo-edit-employee-repository'
import { MongoHelper } from '../../utils'
import { Collection, ObjectId } from 'mongodb'
import { mockCreateEmployeeParams, mockEditEmployeeParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new EditEmployeeMongoRepository(),
  }
}

let EmployeeCollection: Collection

afterAll(async () => {
  await MongoHelper.disconnect()
})

beforeEach(async () => {
  await MongoHelper.connect((globalThis as any).__MONGO_URI__)
  EmployeeCollection = await MongoHelper.getCollection('employee')
  await EmployeeCollection.deleteMany({})
})

describe('Test Suite for mongo-edit-employee-repository.spec', () => {
  test('Ensure that edit employee will return required id and updated params', async () => {
    const itemToInsert = mockCreateEmployeeParams()
    const document = await EmployeeCollection.insertOne(itemToInsert)
    const { sut } = makeSut()
    const id = String(document.insertedId)
    const item = mockEditEmployeeParams(id)
    const result = await sut.edit(id, item)

    expect(result.id).toEqual(new ObjectId(id))

    expect(result.name).toEqual(item.name)
    expect(result.date).toEqual(item.date)
    expect(result.welcomeMessage).toEqual(item.welcomeMessage)
  })
})
