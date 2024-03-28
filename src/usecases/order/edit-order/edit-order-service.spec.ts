import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  EditOrderRepositorySpy,
  mockEditOrderParams,
  throwError,
} from '@test-mocks'
import { DbEditOrder } from './edit-order-service'
import { EditOrderError } from './errors'
import { OrderModel, EditOrderRepositoryProtocol } from '@usecases'

type SutTypes = {
  sut: DbEditOrder
  repository: EditOrderRepositorySpy
  validator: DataValidatorSpy<EditOrderRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new EditOrderRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbEditOrder(repository, validator)

  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for edit-order-service.spec', () => {
  test('Ensure that edit in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'edit')
      .mockImplementation(() => Promise.resolve({} as OrderModel))
    const id = '1'
    const data = mockEditOrderParams(id)
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
    const data = mockEditOrderParams(id)
    await sut.edit(id, data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that edit order service to throw a Custom EditOrderError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'edit').mockImplementationOnce(() =>
      throwError(new EditOrderError('Error')),
    )
    const id = '1'
    const data = mockEditOrderParams(id)
    const promise = sut.edit(id, data)
    await expect(promise).rejects.toThrowError(EditOrderError)
  })

  test('Ensure that edit service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const id = '1'
    const data = mockEditOrderParams(id)
    const result = await sut.edit(id, data)
    expect(result).toEqual(repository.result)
  })
})
