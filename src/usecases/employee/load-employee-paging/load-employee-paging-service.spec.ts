import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  LoadEmployeePagingRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbLoadEmployeePaging } from './load-employee-paging-service'
import { LoadEmployeePagingError } from './errors'
import { LoadEmployeePagingRepositoryProtocol } from './protocols'

type SutTypes = {
  sut: DbLoadEmployeePaging
  repository: LoadEmployeePagingRepositorySpy
  validator: DataValidatorSpy<LoadEmployeePagingRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new LoadEmployeePagingRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbLoadEmployeePaging(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for load-employee-paging-service.spec', () => {
  test('Ensure that loadPaging in repository is called once', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadPaging')
      .mockImplementation(() => Promise.resolve([]))
    await sut.loadPaging()
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that load employee paging service to throw a Custom LoadEmployeePagingError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadPaging').mockImplementationOnce(throwError)
    const promise = sut.loadPaging()
    await expect(promise).rejects.toThrowError(LoadEmployeePagingError)
  })

  test('Ensure that load employee paging service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.loadPaging()
    expect(result).toEqual(repository.result)
  })
})
