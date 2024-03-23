import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  EditDataRepositorySpy,
  mockEditDataParams,
  throwError,
} from '@test-mocks'
import { DbEditData } from './edit-data-service'
import { EditDataError } from './errors'
import { AnyDataModel, EditDataRepositoryProtocol } from '@usecases'

type SutTypes = {
  sut: DbEditData
  repository: EditDataRepositorySpy
  validator: DataValidatorSpy<EditDataRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new EditDataRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbEditData(repository, validator)

  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for edit-data-service.spec', () => {
  test('Ensure that edit in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'edit')
      .mockImplementation(() => Promise.resolve({} as AnyDataModel))
    const id = '1'
    const data = mockEditDataParams(id)
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
    const data = mockEditDataParams(id)
    await sut.edit(id, data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that edit data service to throw a Custom EditDataError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'edit').mockImplementationOnce(() =>
      throwError(new EditDataError('Error')),
    )
    const id = '1'
    const data = mockEditDataParams(id)
    const promise = sut.edit(id, data)
    await expect(promise).rejects.toThrowError(EditDataError)
  })

  test('Ensure that edit service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const id = '1'
    const data = mockEditDataParams(id)
    const result = await sut.edit(id, data)
    expect(result).toEqual(repository.result)
  })
})
