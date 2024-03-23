import { describe, expect, test, vi } from 'vitest'
import {
  CreateDataRepositorySpy,
  DataValidatorSpy,
  mockCreateDataParams,
  throwError,
} from '@test-mocks'
import { DbCreateData } from './create-data-service'
import { CreateDataError } from './errors'
import { AnyDataModel, CreateDataRepositoryProtocol } from '@usecases'

type SutTypes = {
  sut: DbCreateData
  repository: CreateDataRepositorySpy
  validator: DataValidatorSpy<CreateDataRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new CreateDataRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbCreateData(repository, validator)
  return {
    sut,
    repository,
    validator,
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

  test('Ensure that validate in validator is called once', async () => {
    const { sut, validator } = makeSut()
    const spy = vi
      .spyOn(validator, 'validate')
      .mockImplementation(() => Promise.resolve({ success: true } as any))
    const values = mockCreateDataParams()
    await sut.create(values)
    expect(spy).toHaveBeenCalledOnce()
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
