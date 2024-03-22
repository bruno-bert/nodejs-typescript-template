import { describe, expect, test, vi } from 'vitest'
import {
  CreateDataRepositorySpy,
  mockCreateDataParams,
  throwError,
} from '@test-mocks'
import { DbCreateData } from './create-data-service'
import { CreateDataError } from './errors'
import { AnyDataModel } from '@usecases'

type SutTypes = {
  sut: DbCreateData
  repository: CreateDataRepositorySpy
}
const makeSut = (): SutTypes => {
  const repository = new CreateDataRepositorySpy()
  const sut = new DbCreateData(repository)
  return {
    sut,
    repository,
  }
}

describe('Test Suite for create-data-service.spec', () => {
  test('Ensure that create in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'create')
      .mockImplementation(() => Promise.resolve({} as AnyDataModel))
    const data = mockCreateDataParams()
    await sut.create(data)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(data)
  })

  test('Ensure that create data service to throw a Custom CreateDataError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'create').mockImplementationOnce(() =>
      throwError(new CreateDataError('Error')),
    )
    const data = mockCreateDataParams()
    const promise = sut.create(data)
    await expect(promise).rejects.toThrowError(CreateDataError)
  })

  test('Ensure that create service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const data = mockCreateDataParams()
    const result = await sut.create(data)
    expect(result).toEqual(repository.result)
  })
})
