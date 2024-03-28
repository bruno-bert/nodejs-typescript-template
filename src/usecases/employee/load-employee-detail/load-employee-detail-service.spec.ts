import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  LoadEmployeeDetailRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbLoadEmployeeDetail } from './load-employee-detail-service'
import { LoadEmployeeDetailError } from './errors'
import { EmployeeModel } from '../employee-model'
import { LoadEmployeeDetailRepositoryProtocol } from './protocols'

type SutTypes = {
  sut: DbLoadEmployeeDetail
  repository: LoadEmployeeDetailRepositorySpy
  validator: DataValidatorSpy<LoadEmployeeDetailRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new LoadEmployeeDetailRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbLoadEmployeeDetail(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for load-employee-detail-service.spec', () => {
  test('Ensure that load in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadById')
      .mockImplementation(() => Promise.resolve({} as EmployeeModel))
    const id = '1'
    await sut.load(id)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(id)
  })

  test('Ensure that validate in validator is called once', async () => {
    const { sut, validator } = makeSut()
    const spy = vi
      .spyOn(validator, 'validate')
      .mockImplementation(() => Promise.resolve({ success: true } as any))
    await sut.load('1')
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that load employee detail service to throw a Custom LoadEmployeeDetailError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadById').mockImplementationOnce(() =>
      throwError(new LoadEmployeeDetailError('Error')),
    )
    const promise = sut.load('1')
    await expect(promise).rejects.toThrowError(LoadEmployeeDetailError)
  })

  test('Ensure that load employee detail service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.load('1')
    expect(result).toEqual(repository.result)
  })
})
