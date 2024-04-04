import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  EditSharkRepositorySpy,
  mockEditSharkParams,
  throwError,
} from '@test-mocks'
import { DbEditShark } from './edit-shark-service'
import { EditSharkError } from './errors'
import { SharkModel, EditSharkRepositoryProtocol } from '@usecases'

type SutTypes = {
  sut: DbEditShark
  repository: EditSharkRepositorySpy
  validator: DataValidatorSpy<EditSharkRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new EditSharkRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbEditShark(repository, validator)

  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for edit-shark-service.spec', () => {
  test('Ensure that edit in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'edit')
      .mockImplementation(() => Promise.resolve({} as SharkModel))
    const id = '1'
    const data = mockEditSharkParams(id)
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
    const data = mockEditSharkParams(id)
    await sut.edit(id, data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that edit shark service to throw a Custom EditSharkError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'edit').mockImplementationOnce(() =>
      throwError(new EditSharkError('Error')),
    )
    const id = '1'
    const data = mockEditSharkParams(id)
    const promise = sut.edit(id, data)
    await expect(promise).rejects.toThrowError(EditSharkError)
  })

  test('Ensure that edit service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const id = '1'
    const data = mockEditSharkParams(id)
    const result = await sut.edit(id, data)
    expect(result).toEqual(repository.result)
  })
})
