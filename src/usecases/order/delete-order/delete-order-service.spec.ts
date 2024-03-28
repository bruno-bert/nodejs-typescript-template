import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  DeleteOrderRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbDeleteOrder } from './delete-order-service'
import { DeleteOrderError } from './errors'
import { DeleteOrderRepositoryProtocol } from '@usecases'

type SutTypes = {
  sut: DbDeleteOrder
  repository: DeleteOrderRepositorySpy
  validator: DataValidatorSpy<DeleteOrderRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new DeleteOrderRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbDeleteOrder(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for delete-order-service.spec', () => {
  test('Ensure that delete in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'delete')
      .mockImplementation(() =>
        Promise.resolve({} as DeleteOrderRepositoryProtocol.Result),
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

  test('Ensure that delete order service to throw a Custom DeleteOrderError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'delete').mockImplementationOnce(() =>
      throwError(new DeleteOrderError('Error')),
    )
    const id = '1'
    const promise = sut.delete({ id })
    await expect(promise).rejects.toThrowError(DeleteOrderError)
  })

  test('Ensure that delete service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const id = '1'
    const result = await sut.delete({ id })
    expect(result).toEqual(repository.result)
  })
})
