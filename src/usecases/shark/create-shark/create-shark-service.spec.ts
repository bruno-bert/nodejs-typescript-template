import { describe, expect, test, vi } from 'vitest'
import {
  CreateSharkRepositorySpy,
  DataValidatorSpy,
  mockCreateSharkParams,
  throwError,
} from '@test-mocks'
import { DbCreateShark } from './create-shark-service'
import { CreateSharkError } from './errors'
import { SharkModel, CreateSharkRepositoryProtocol } from '@usecases'

type SutTypes = {
  sut: DbCreateShark
  repository: CreateSharkRepositorySpy
  validator: DataValidatorSpy<CreateSharkRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new CreateSharkRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbCreateShark(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for create-shark-service.spec', () => {
  test('Ensure that create in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'create')
      .mockImplementation(() => Promise.resolve({} as SharkModel))
    const data = mockCreateSharkParams()
    await sut.create(data)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(data)
  })

  test('Ensure that validate in validator is called once', async () => {
    const { sut, validator } = makeSut()
    const spy = vi
      .spyOn(validator, 'validate')
      .mockImplementation(() => Promise.resolve({ success: true } as any))
    const values = mockCreateSharkParams()
    await sut.create(values)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that create data service to throw a Custom CreateSharkError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'create').mockImplementationOnce(() =>
      throwError(new CreateSharkError('Error')),
    )
    const data = mockCreateSharkParams()
    const promise = sut.create(data)
    await expect(promise).rejects.toThrowError(CreateSharkError)
  })

  test('Ensure that create service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const data = mockCreateSharkParams()
    const result = await sut.create(data)
    expect(result).toEqual(repository.result)
  })
})
