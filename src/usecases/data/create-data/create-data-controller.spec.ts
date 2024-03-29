import { describe, expect, test, vi } from 'vitest'
import { CreateDataSpy, mockCreateDataParams, throwError } from '@test-mocks'

import {
  AnyDataModel,
  CreateDataController,
  MissingParamsError,
} from '@usecases'

type SutTypes = {
  sut: CreateDataController
  service: CreateDataSpy
}
const makeSut = (): SutTypes => {
  const service = new CreateDataSpy()
  const sut = new CreateDataController(service)
  return {
    sut,
    service,
  }
}

describe('Test Suite for create-data-controller.spec', () => {
  test('Ensure that create in service is called once and with same parameters', async () => {
    const { sut, service } = makeSut()
    const spy = vi
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve({} as AnyDataModel))
    const data = mockCreateDataParams()
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(data)
  })

  test('Ensure that map in controller is called once in handler and with same parameters', async () => {
    const { sut } = makeSut()
    const spy = vi
      .spyOn(sut, 'map')
      .mockImplementation(() => Promise.resolve({} as AnyDataModel))
    const data = mockCreateDataParams()
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(data)
  })

  test('Ensure that controller to return http response equals to 200 on success', async () => {
    const { sut } = makeSut()
    const data = mockCreateDataParams()
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(200)
  })

  test('Ensure that controller to return http response 204 when there is no data', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'create').mockImplementationOnce(async () => {
      return Promise.resolve(null as unknown as AnyDataModel)
    })
    const data = mockCreateDataParams()
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(204)
  })

  test('Ensure that controller to return http response equals to 400 on MissingParamsError error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'create').mockImplementationOnce(() =>
      throwError(new MissingParamsError('Error')),
    )
    const data = mockCreateDataParams()
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(400)
  })

  test('Ensure that controller to return http response equals to 500 on Unknown error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'create').mockImplementationOnce(() => throwError())
    const data = mockCreateDataParams()
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(500)
  })
})
