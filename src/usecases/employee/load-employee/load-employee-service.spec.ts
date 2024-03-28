import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  LoadEmployeeRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbLoadEmployee } from './load-employee-service'
import { LoadEmployeeError } from './errors'

type SutTypes = {
  sut: DbLoadEmployee
  repository: LoadEmployeeRepositorySpy
  validator: DataValidatorSpy<any>
}
const makeSut = (): SutTypes => {
  const repository = new LoadEmployeeRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbLoadEmployee(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for load-employee-service.spec', () => {
  test('Ensure that loadAll in repository is called once', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadAll')
      .mockImplementation(() => Promise.resolve([]))
    await sut.load()
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that load employee service to throw a Custom LoadEmployeeError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadAll').mockImplementationOnce(() =>
      throwError(new LoadEmployeeError('Error')),
    )
    const promise = sut.load()
    await expect(promise).rejects.toThrowError(LoadEmployeeError)
  })

  test('Ensure that load employee service returns exaclty what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.load()
    expect(result).toEqual(repository.result)
  })
})
