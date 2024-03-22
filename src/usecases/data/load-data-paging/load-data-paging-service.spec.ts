import { describe, expect, test, vi } from 'vitest'
import { LoadDataPagingRepositorySpy, throwError } from '@test-mocks'
import { DbLoadDataPaging } from './load-data-paging-service'
import { LoadDataPagingError } from './errors'

type SutTypes = {
  sut: DbLoadDataPaging
  repository: LoadDataPagingRepositorySpy
}
const makeSut = (): SutTypes => {
  const repository = new LoadDataPagingRepositorySpy()
  const sut = new DbLoadDataPaging(repository)
  return {
    sut,
    repository,
  }
}

describe('Test Suite for load-data-paging-service.spec', () => {
  test('Ensure that loadPaging in repository is called once', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadPaging')
      .mockImplementation(() => Promise.resolve([]))
    await sut.loadPaging()
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that load data paging service to throw a Custom LoadDataPagingError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadPaging').mockImplementationOnce(throwError)
    const promise = sut.loadPaging()
    await expect(promise).rejects.toThrowError(LoadDataPagingError)
  })

  test('Ensure that load data paging service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.loadPaging()
    expect(result).toEqual(repository.result)
  })
})
