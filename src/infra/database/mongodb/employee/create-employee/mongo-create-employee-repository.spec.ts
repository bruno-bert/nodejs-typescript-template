import { describe, expect, test, afterAll, beforeEach } from 'vitest'
import { CreateEmployeeMongoRepository } from './mongo-create-employee-repository'
import { MongoHelper } from '../../utils'
import { Collection } from 'mongodb'
import { mockCreateEmployeeParams } from '@test-mocks'

const makeSut = () => {
  return {
    sut: new CreateEmployeeMongoRepository(),
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

describe('Test Suite for mongo-create-employee-repository.spec', () => {
  test('Ensure that create -employee will return inserted params', async () => {
    const item = mockCreateEmployeeParams()
    const { sut } = makeSut()
    const result = await sut.create(item)

    expect(result.name).toEqual(item.name)
    expect(result.date).toEqual(item.date)
    expect(result.welcomeMessage).toEqual(item.welcomeMessage)
  })
})
