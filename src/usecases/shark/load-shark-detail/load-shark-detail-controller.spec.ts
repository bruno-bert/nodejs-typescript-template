import { describe, expect, test, vi } from 'vitest'
import { LoadSharkDetailSpy, throwError } from '@test-mocks'

import {
  SharkModel,
  LoadSharkDetailController,
  MissingParamsError,
} from '@usecases'

type SutTypes = {
  sut: LoadSharkDetailController
  service: LoadSharkDetailSpy
}
const makeSut = (): SutTypes => {
  const service = new LoadSharkDetailSpy()
  const sut = new LoadSharkDetailController(service)
  return {
    sut,
    service,
  }
}

describe('Test Suite for load-shark-detail-service.spec', () => {
  test('Ensure that load detail in service is called once and with same parameters', async () => {
    const { sut, service } = makeSut()
    const spy = vi
      .spyOn(service, 'load')
      .mockImplementation(() => Promise.resolve({} as SharkModel))
    const data = { id: '1' }
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('1')
  })

  test('Ensure that controller to return http response equals to 200 on success', async () => {
    const { sut } = makeSut()
    const data = { id: '1' }
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(200)
  })

  test('Ensure that controller to return http response 204 when there is no data', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'load').mockImplementationOnce(async () => {
      return Promise.resolve(null as unknown as SharkModel)
    })
    const data = { id: '1' }
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(204)
  })

  test('Ensure that controller to return http response equals to 400 on MissingParamsError error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'load').mockImplementationOnce(() =>
      throwError(new MissingParamsError('Error')),
    )
    const data = { id: '1' }
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(400)
  })

  test('Ensure that controller to return http response equals to 500 on Unknown error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'load').mockImplementationOnce(() => throwError())
    const data = { id: '1' }
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(500)
  })
})
