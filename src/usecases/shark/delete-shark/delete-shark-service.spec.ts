import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  DeleteSharkRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbDeleteShark } from './delete-shark-service'
import { DeleteSharkError } from './errors'
import { DeleteSharkRepositoryProtocol } from '@usecases'

type SutTypes = {
  sut: DbDeleteShark
  repository: DeleteSharkRepositorySpy
  validator: DataValidatorSpy<DeleteSharkRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new DeleteSharkRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbDeleteShark(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for delete-shark-service.spec', () => {
  test('Ensure that delete in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'delete')
      .mockImplementation(() =>
        Promise.resolve({} as DeleteSharkRepositoryProtocol.Result),
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

  test('Ensure that delete shark service to throw a Custom DeleteSharkError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'delete').mockImplementationOnce(() =>
      throwError(new DeleteSharkError('Error')),
    )
    const id = '1'
    const promise = sut.delete({ id })
    await expect(promise).rejects.toThrowError(DeleteSharkError)
  })

  test('Ensure that delete service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const id = '1'
    const result = await sut.delete({ id })
    expect(result).toEqual(repository.result)
  })
})
