import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { LoadEmployeeMongoRepository } from './mongo-load-employee-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateEmployeeParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadEmployeeMongoRepository(),
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

describe('Test Suite for mongo-load-employee-repository.spec', () => {
  test('Ensure that load employee will return items', async () => {
    const addEmployeeModels = [
      mockCreateEmployeeParams(),
      mockCreateEmployeeParams(),
    ]
    await EmployeeCollection.insertMany(addEmployeeModels)

    const { sut } = makeSut()
    const result = await sut.loadAll()

    expect(result.length).toEqual(2)
  })
})
