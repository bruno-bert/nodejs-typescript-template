import { describe, expect, test, vi } from 'vitest'
import { LoadDataDetailRepositorySpy, throwError } from '@test-mocks'
import { DbLoadDataDetail } from './load-data-detail-service'
import { LoadDataDetailError } from './errors'
import { AnyDataModel } from '../data-model'

type SutTypes = {
  sut: DbLoadDataDetail
  repository: LoadDataDetailRepositorySpy
}
const makeSut = (): SutTypes => {
  const repository = new LoadDataDetailRepositorySpy()
  const sut = new DbLoadDataDetail(repository)
  return {
    sut,
    repository,
  }
}

describe('Test Suite for load-data-detail-service.spec', () => {
  test('Ensure that load in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadById')
      .mockImplementation(() => Promise.resolve({} as AnyDataModel))
    const id = '1'
    await sut.load(id)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(id)
  })

  test('Ensure that load data detail service to throw a Custom LoadDataDetailError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadById').mockImplementationOnce(() =>
      throwError(new LoadDataDetailError('Error')),
    )
    const promise = sut.load('1')
    await expect(promise).rejects.toThrowError(LoadDataDetailError)
  })

  test('Ensure that load data detail service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.load('1')
    expect(result).toEqual(repository.result)
  })
})
