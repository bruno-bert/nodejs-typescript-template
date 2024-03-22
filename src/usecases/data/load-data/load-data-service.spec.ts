import { describe, expect, test, vi } from 'vitest'
import { LoadDataRepositorySpy, throwError } from '@test-mocks'
import { DbLoadData } from './load-data-service'
import { LoadDataError } from './errors'

type SutTypes = {
  sut: DbLoadData
  repository: LoadDataRepositorySpy
}
const makeSut = (): SutTypes => {
  const repository = new LoadDataRepositorySpy()
  const sut = new DbLoadData(repository)
  return {
    sut,
    repository,
  }
}

describe('Test Suite for load-data-service.spec', () => {
  test('Ensure that loadAll in repository is called once', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadAll')
      .mockImplementation(() => Promise.resolve([]))
    await sut.load()
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that load data service to throw a Custom LoadDataError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadAll').mockImplementationOnce(() =>
      throwError(new LoadDataError('Error')),
    )
    const promise = sut.load()
    await expect(promise).rejects.toThrowError(LoadDataError)
  })

  test('Ensure that load data service returns exaclty what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.load()
    expect(result).toEqual(repository.result)
  })
})
