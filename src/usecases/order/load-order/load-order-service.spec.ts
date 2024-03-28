import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  LoadOrderRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbLoadOrder } from './load-order-service'
import { LoadOrderError } from './errors'

type SutTypes = {
  sut: DbLoadOrder
  repository: LoadOrderRepositorySpy
  validator: DataValidatorSpy<any>
}
const makeSut = (): SutTypes => {
  const repository = new LoadOrderRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbLoadOrder(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for load-order-service.spec', () => {
  test('Ensure that loadAll in repository is called once', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadAll')
      .mockImplementation(() => Promise.resolve([]))
    await sut.load()
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that load order service to throw a Custom LoadOrderError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadAll').mockImplementationOnce(() =>
      throwError(new LoadOrderError('Error')),
    )
    const promise = sut.load()
    await expect(promise).rejects.toThrowError(LoadOrderError)
  })

  test('Ensure that load order service returns exaclty what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.load()
    expect(result).toEqual(repository.result)
  })
})
