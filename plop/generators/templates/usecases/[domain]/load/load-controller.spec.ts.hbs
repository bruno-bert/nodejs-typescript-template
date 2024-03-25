import { describe, expect, test, vi } from 'vitest'
import { LoadDataSpy, throwError } from '@test-mocks'

import { AnyDataModel, LoadDataController, MissingParamsError } from '@usecases'

type SutTypes = {
  sut: LoadDataController
  service: LoadDataSpy
}
const makeSut = (): SutTypes => {
  const service = new LoadDataSpy()
  const sut = new LoadDataController(service)
  return {
    sut,
    service,
  }
}

describe('Test Suite for load-data-controller.spec', () => {
  test('Ensure that load in service is called once', async () => {
    const { sut, service } = makeSut()
    const spy = vi
      .spyOn(service, 'load')
      .mockImplementation(() => Promise.resolve([] as AnyDataModel[]))
    const data = {} as LoadDataController.Request
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that controller to return http response equals to 200 on success', async () => {
    const { sut } = makeSut()
    const data = {} as LoadDataController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(200)
  })

  test('Ensure that controller to return http response 204 when there is no data', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'load').mockImplementationOnce(async () => {
      return Promise.resolve(null as unknown as AnyDataModel[])
    })
    const data = {} as LoadDataController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(204)
  })

  test('Ensure that controller to return http response equals to 400 on MissingParamsError error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'load').mockImplementationOnce(() =>
      throwError(new MissingParamsError('Error')),
    )
    const data = {} as LoadDataController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(400)
  })

  test('Ensure that controller to return http response equals to 500 on Unknown error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'load').mockImplementationOnce(() => throwError())
    const data = {} as LoadDataController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(500)
  })
})
