import { describe, expect, test, vi } from 'vitest'
import {
  DataValidatorSpy,
  LoadSharkDetailRepositorySpy,
  throwError,
} from '@test-mocks'
import { DbLoadSharkDetail } from './load-shark-detail-service'
import { LoadSharkDetailError } from './errors'
import { SharkModel } from '../shark-model'
import { LoadSharkDetailRepositoryProtocol } from './protocols'

type SutTypes = {
  sut: DbLoadSharkDetail
  repository: LoadSharkDetailRepositorySpy
  validator: DataValidatorSpy<LoadSharkDetailRepositoryProtocol.Params>
}
const makeSut = (): SutTypes => {
  const repository = new LoadSharkDetailRepositorySpy()
  const validator = new DataValidatorSpy()
  const sut = new DbLoadSharkDetail(repository, validator)
  return {
    sut,
    repository,
    validator,
  }
}

describe('Test Suite for load-shark-detail-service.spec', () => {
  test('Ensure that load in repository is called once and with same parameters', async () => {
    const { sut, repository } = makeSut()
    const spy = vi
      .spyOn(repository, 'loadById')
      .mockImplementation(() => Promise.resolve({} as SharkModel))
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

  test('Ensure that load shark detail service to throw a Custom LoadSharkDetailError when repository throws', async () => {
    const { sut, repository } = makeSut()
    vi.spyOn(repository, 'loadById').mockImplementationOnce(() =>
      throwError(new LoadSharkDetailError('Error')),
    )
    const promise = sut.load('1')
    await expect(promise).rejects.toThrowError(LoadSharkDetailError)
  })

  test('Ensure that load shark detail service returns exactly what the repository returns', async () => {
    const { sut, repository } = makeSut()
    const result = await sut.load('1')
    expect(result).toEqual(repository.result)
  })
})
