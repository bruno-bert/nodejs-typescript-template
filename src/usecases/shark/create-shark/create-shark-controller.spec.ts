import { describe, expect, test, vi } from 'vitest'
import { CreateSharkSpy, mockCreateSharkRequest, throwError } from '@test-mocks'

import { SharkModel, MissingParamsError } from '@usecases'

import { CreateSharkController } from './create-shark-controller'

type SutTypes = {
  sut: CreateSharkController
  service: CreateSharkSpy
}
const makeSut = (): SutTypes => {
  const service = new CreateSharkSpy()
  const sut = new CreateSharkController(service)
  return {
    sut,
    service,
  }
}

describe('Test Suite for create-shark-controller.spec', () => {
  test('Ensure that create in service is called once', async () => {
    const { sut, service } = makeSut()
    const spy = vi
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve({} as SharkModel))
    const data = mockCreateSharkRequest()
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that map in controller is called once in handler', async () => {
    const { sut } = makeSut()
    const spy = vi
      .spyOn(sut, 'map')
      .mockImplementation(() => Promise.resolve({} as SharkModel))
    const data = mockCreateSharkRequest()
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that controller to return http response equals to 200 on success', async () => {
    const { sut } = makeSut()
    const data = mockCreateSharkRequest()
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(200)
  })

  test('Ensure that controller to return http response 204 when there is no data', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'create').mockImplementationOnce(async () => {
      return Promise.resolve(null as unknown as SharkModel)
    })
    const data = mockCreateSharkRequest()
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(204)
  })

  test('Ensure that controller to return http response equals to 400 on MissingParamsError error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'create').mockImplementationOnce(() =>
      throwError(new MissingParamsError('Error')),
    )
    const data = mockCreateSharkRequest()
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(400)
  })

  test('Ensure that controller to return http response equals to 500 on Unknown error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'create').mockImplementationOnce(() => throwError())
    const data = mockCreateSharkRequest()
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(500)
  })
})
