import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  LoadSharkPagingRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbLoadSharkPaging } from './load-shark-paging-service'
import { LoadSharkPagingError } from './errors'
import { LoadSharkPagingRepositoryProtocol } from './protocols'

type SutTypes = {
  sut: DbLoadSharkPaging
  repository: LoadSharkPagingRepositorySpy
  validator: DataValidatorSpy<LoadSharkPagingRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new LoadSharkPagingRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbLoadSharkPaging(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for load-shark-paging-service.spec', () => {
  test('Ensure that loadPaging in repository is called once', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadPaging')
      .mockImplementation(() => Promise.resolve([]))
    await sut.loadPaging()
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that load shark paging service to throw a Custom LoadSharkPagingError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadPaging').mockImplementationOnce(throwError)
    const promise = sut.loadPaging()
    await expect(promise).rejects.toThrowError(LoadSharkPagingError)
  })

  test('Ensure that load shark paging service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.loadPaging()
    expect(result).toEqual(repository.result)
  })
})
