import { describe, expect, test, vi } from 'vitest'
import {
  EditDataRepositorySpy,
  mockEditDataParams,
  throwError,
} from '@test-mocks'
import { DbEditData } from './edit-data-service'
import { EditDataError } from './errors'
import { AnyDataModel } from '@usecases'

type SutTypes = {
  sut: DbEditData
  repository: EditDataRepositorySpy
}
const makeSut = (): SutTypes => {
  const repository = new EditDataRepositorySpy()
  const sut = new DbEditData(repository)
  return {
    sut,
    repository,
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
