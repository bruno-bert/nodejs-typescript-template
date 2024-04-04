import { describe, expect, test, vi } from 'vitest'
import { LoadSharkSpy, throwError } from '@test-mocks'

import { SharkModel, LoadSharkController, MissingParamsError } from '@usecases'

type SutTypes = {
  sut: LoadSharkController
  service: LoadSharkSpy
}
const makeSut = (): SutTypes => {
  const service = new LoadSharkSpy()
  const sut = new LoadSharkController(service)
  return {
    sut,
    service,
  }
}

describe('Test Suite for load-shark-controller.spec', () => {
  test('Ensure that load in service is called once', async () => {
    const { sut, service } = makeSut()
    const spy = vi
      .spyOn(service, 'load')
      .mockImplementation(() => Promise.resolve([] as SharkModel[]))
    const data = {} as LoadSharkController.Request
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that controller to return http response equals to 200 on success', async () => {
    const { sut } = makeSut()
    const data = {} as LoadSharkController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(200)
  })

  test('Ensure that controller to return http response 204 when there is no data', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'load').mockImplementationOnce(async () => {
      return Promise.resolve(null as unknown as SharkModel[])
    })
    const data = {} as LoadSharkController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(204)
  })

  test('Ensure that controller to return http response equals to 400 on MissingParamsError error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'load').mockImplementationOnce(() =>
      throwError(new MissingParamsError('Error')),
    )
    const data = {} as LoadSharkController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(400)
  })

  test('Ensure that controller to return http response equals to 500 on Unknown error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'load').mockImplementationOnce(() => throwError())
    const data = {} as LoadSharkController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(500)
  })
})
