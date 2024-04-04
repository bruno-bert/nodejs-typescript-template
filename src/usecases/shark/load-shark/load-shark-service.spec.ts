import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  LoadSharkRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbLoadShark } from './load-shark-service'
import { LoadSharkError } from './errors'

type SutTypes = {
  sut: DbLoadShark
  repository: LoadSharkRepositorySpy
  validator: DataValidatorSpy<any>
}
const makeSut = (): SutTypes => {
  const repository = new LoadSharkRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbLoadShark(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for load-shark-service.spec', () => {
  test('Ensure that loadAll in repository is called once', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadAll')
      .mockImplementation(() => Promise.resolve([]))
    await sut.load()
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that load shark service to throw a Custom LoadSharkError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadAll').mockImplementationOnce(() =>
      throwError(new LoadSharkError('Error')),
    )
    const promise = sut.load()
    await expect(promise).rejects.toThrowError(LoadSharkError)
  })

  test('Ensure that load shark service returns exaclty what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.load()
    expect(result).toEqual(repository.result)
  })
})
