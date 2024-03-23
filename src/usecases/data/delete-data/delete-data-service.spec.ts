import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  DeleteDataRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbDeleteData } from './delete-data-service'
import { DeleteDataError } from './errors'
import { DeleteDataRepositoryProtocol } from '@usecases'

type SutTypes = {
  sut: DbDeleteData
  repository: DeleteDataRepositorySpy
  validator: DataValidatorSpy<DeleteDataRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new DeleteDataRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbDeleteData(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for delete-data-service.spec', () => {
  test('Ensure that delete in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'delete')
      .mockImplementation(() =>
        Promise.resolve({} as DeleteDataRepositoryProtocol.Result),
      )
    const id = '1'
    await sut.delete({ id })
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith({ id })
  })

  test('Ensure that validate in validator is called once', async () => {
    const { sut, validator } = makeSut()
    const spy = vi
      .spyOn(validator, 'validate')
      .mockImplementation(() => Promise.resolve({ success: true } as any))
    await sut.delete({ id: '1' })
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that delete data service to throw a Custom DeleteDataError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'delete').mockImplementationOnce(() =>
      throwError(new DeleteDataError('Error')),
    )
    const id = '1'
    const promise = sut.delete({ id })
    await expect(promise).rejects.toThrowError(DeleteDataError)
  })

  test('Ensure that delete service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const id = '1'
    const result = await sut.delete({ id })
    expect(result).toEqual(repository.result)
  })
})
