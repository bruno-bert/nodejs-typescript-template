import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { DeleteEmployeeMongoRepository } from './mongo-delete-employee-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new DeleteEmployeeMongoRepository(),
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

describe('Test Suite for mongo-delete-employee-repository.spec', () => {
  test('Ensure that delete employee will return correct count of deleted record', async () => {
    let item = mockCreateDataParams()
    let document = await EmployeeCollection.insertOne(item)
    item = mockCreateDataParams()
    document = await EmployeeCollection.insertOne(item)

    const { sut } = makeSut()
    const id = String(document.insertedId)
    const result = await sut.delete({ id })
    expect(result.success).toEqual(true)
    expect(result.count).toEqual(1)
  })
})
