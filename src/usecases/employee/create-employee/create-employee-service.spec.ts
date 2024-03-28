import { describe, expect, test, vi } from 'vitest'
import {
  CreateEmployeeRepositorySpy,
  DataValidatorSpy,
  mockCreateEmployeeParams,
  throwError,
} from '@test-mocks'
import { DbCreateEmployee } from './create-employee-service'
import { CreateEmployeeError } from './errors'
import { EmployeeModel, CreateEmployeeRepositoryProtocol } from '@usecases'

type SutTypes = {
  sut: DbCreateEmployee
  repository: CreateEmployeeRepositorySpy
  validator: DataValidatorSpy<CreateEmployeeRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new CreateEmployeeRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbCreateEmployee(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for create-employee-service.spec', () => {
  test('Ensure that create in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'create')
      .mockImplementation(() => Promise.resolve({} as EmployeeModel))
    const data = mockCreateEmployeeParams()
    await sut.create(data)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(data)
  })

  test('Ensure that validate in validator is called once', async () => {
    const { sut, validator } = makeSut()
    const spy = vi
      .spyOn(validator, 'validate')
      .mockImplementation(() => Promise.resolve({ success: true } as any))
    const values = mockCreateEmployeeParams()
    await sut.create(values)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that create data service to throw a Custom CreateEmployeeError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'create').mockImplementationOnce(() =>
      throwError(new CreateEmployeeError('Error')),
    )
    const data = mockCreateEmployeeParams()
    const promise = sut.create(data)
    await expect(promise).rejects.toThrowError(CreateEmployeeError)
  })

  test('Ensure that create service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const data = mockCreateEmployeeParams()
    const result = await sut.create(data)
    expect(result).toEqual(repository.result)
  })
})
