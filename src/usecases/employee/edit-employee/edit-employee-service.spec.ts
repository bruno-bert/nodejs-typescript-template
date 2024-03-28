import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  EditEmployeeRepositorySpy,
  mockEditEmployeeParams,
  throwError,
} from '@test-mocks'
import { DbEditEmployee } from './edit-employee-service'
import { EditEmployeeError } from './errors'
import { EmployeeModel, EditEmployeeRepositoryProtocol } from '@usecases'

type SutTypes = {
  sut: DbEditEmployee
  repository: EditEmployeeRepositorySpy
  validator: DataValidatorSpy<EditEmployeeRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new EditEmployeeRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbEditEmployee(repository, validator)

  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for edit-employee-service.spec', () => {
  test('Ensure that edit in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'edit')
      .mockImplementation(() => Promise.resolve({} as EmployeeModel))
    const id = '1'
    const data = mockEditEmployeeParams(id)
    await sut.edit(id, data)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(id, data)
  })

  test('Ensure that validate in validator is called once', async () => {
    const { sut, validator } = makeSut()
    const spy = vi
      .spyOn(validator, 'validate')
      .mockImplementation(() => Promise.resolve({ success: true } as any))
    const id = '1'
    const data = mockEditEmployeeParams(id)
    await sut.edit(id, data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that edit employee service to throw a Custom EditEmployeeError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'edit').mockImplementationOnce(() =>
      throwError(new EditEmployeeError('Error')),
    )
    const id = '1'
    const data = mockEditEmployeeParams(id)
    const promise = sut.edit(id, data)
    await expect(promise).rejects.toThrowError(EditEmployeeError)
  })

  test('Ensure that edit service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const id = '1'
    const data = mockEditEmployeeParams(id)
    const result = await sut.edit(id, data)
    expect(result).toEqual(repository.result)
  })
})
