import { describe, expect, test, vi } from 'vitest'
import {
  CreateOrderRepositorySpy,
  DataValidatorSpy,
  mockCreateOrderParams,
  throwError,
} from '@test-mocks'
import { DbCreateOrder } from './create-order-service'
import { CreateOrderError } from './errors'
import { OrderModel, CreateOrderRepositoryProtocol } from '@usecases'

type SutTypes = {
  sut: DbCreateOrder
  repository: CreateOrderRepositorySpy
  validator: DataValidatorSpy<CreateOrderRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new CreateOrderRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbCreateOrder(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for create-order-service.spec', () => {
  test('Ensure that create in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'create')
      .mockImplementation(() => Promise.resolve({} as OrderModel))
    const data = mockCreateOrderParams()
    await sut.create(data)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(data)
  })

  test('Ensure that validate in validator is called once', async () => {
    const { sut, validator } = makeSut()
    const spy = vi
      .spyOn(validator, 'validate')
      .mockImplementation(() => Promise.resolve({ success: true } as any))
    const values = mockCreateOrderParams()
    await sut.create(values)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that create data service to throw a Custom CreateOrderError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'create').mockImplementationOnce(() =>
      throwError(new CreateOrderError('Error')),
    )
    const data = mockCreateOrderParams()
    const promise = sut.create(data)
    await expect(promise).rejects.toThrowError(CreateOrderError)
  })

  test('Ensure that create service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const data = mockCreateOrderParams()
    const result = await sut.create(data)
    expect(result).toEqual(repository.result)
  })
})
