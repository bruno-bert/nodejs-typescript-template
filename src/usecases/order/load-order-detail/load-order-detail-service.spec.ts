import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  LoadOrderDetailRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbLoadOrderDetail } from './load-order-detail-service'
import { LoadOrderDetailError } from './errors'
import { OrderModel } from '../order-model'
import { LoadOrderDetailRepositoryProtocol } from './protocols'

type SutTypes = {
  sut: DbLoadOrderDetail
  repository: LoadOrderDetailRepositorySpy
  validator: DataValidatorSpy<LoadOrderDetailRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new LoadOrderDetailRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbLoadOrderDetail(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for load-order-detail-service.spec', () => {
  test('Ensure that load in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadById')
      .mockImplementation(() => Promise.resolve({} as OrderModel))
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

  test('Ensure that load order detail service to throw a Custom LoadOrderDetailError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadById').mockImplementationOnce(() =>
      throwError(new LoadOrderDetailError('Error')),
    )
    const promise = sut.load('1')
    await expect(promise).rejects.toThrowError(LoadOrderDetailError)
  })

  test('Ensure that load order detail service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.load('1')
    expect(result).toEqual(repository.result)
  })
})
