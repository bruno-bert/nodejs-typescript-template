import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  LoadOrderPagingRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbLoadOrderPaging } from './load-order-paging-service'
import { LoadOrderPagingError } from './errors'
import { LoadOrderPagingRepositoryProtocol } from './protocols'

type SutTypes = {
  sut: DbLoadOrderPaging
  repository: LoadOrderPagingRepositorySpy
  validator: DataValidatorSpy<LoadOrderPagingRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new LoadOrderPagingRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbLoadOrderPaging(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for load-order-paging-service.spec', () => {
  test('Ensure that loadPaging in repository is called once', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadPaging')
      .mockImplementation(() => Promise.resolve([]))
    await sut.loadPaging()
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that load order paging service to throw a Custom LoadOrderPagingError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadPaging').mockImplementationOnce(throwError)
    const promise = sut.loadPaging()
    await expect(promise).rejects.toThrowError(LoadOrderPagingError)
  })

  test('Ensure that load order paging service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.loadPaging()
    expect(result).toEqual(repository.result)
  })
})
