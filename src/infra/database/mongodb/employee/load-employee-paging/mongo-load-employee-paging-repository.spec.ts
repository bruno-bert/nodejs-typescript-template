import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { LoadEmployeePagingMongoRepository } from './mongo-load-employee-paging-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateEmployeeParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadEmployeePagingMongoRepository(),
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

describe('Test Suite for mongo-load-employee-paging-repository.spec', () => {
  test('Ensure that load employee paging will return items', async () => {
    const addEmployeeModels = [
      mockCreateEmployeeParams(),
      mockCreateEmployeeParams(),
    ]
    await EmployeeCollection.insertMany(addEmployeeModels)

    const { sut } = makeSut()
    const result = await sut.loadPaging()

    expect(result.length).toEqual(2)
  })
})
