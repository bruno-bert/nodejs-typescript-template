import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { LoadEmployeeDetailMongoRepository } from './mongo-load-employee-detail-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateDataParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new LoadEmployeeDetailMongoRepository(),
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

describe('Test Suite for mongo-load-employee-detail-repository.spec', () => {
  test('Ensure that load employee detail will return required id', async () => {
    const document = await EmployeeCollection.insertOne(mockCreateDataParams())
    const { sut } = makeSut()
    const id = String(document.insertedId)
    const result = await sut.loadById(id)
    expect(result.id).toEqual(document.insertedId)
  })
})
