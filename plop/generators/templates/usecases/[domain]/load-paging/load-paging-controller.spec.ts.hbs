import { describe, expect, test, vi } from 'vitest'
import { LoadDataPagingSpy, throwError } from '@test-mocks'

import {
  AnyDataModel,
  LoadDataPagingController,
  MissingParamsError,
} from '@usecases'

type SutTypes = {
  sut: LoadDataPagingController
  service: LoadDataPagingSpy
}
const makeSut = (): SutTypes => {
  const service = new LoadDataPagingSpy()
  const sut = new LoadDataPagingController(service)
  return {
    sut,
    service,
  }
}

describe('Test Suite for load-data-paging-service.spec', () => {
  test('Ensure that load data paging in service is called once and with same parameters', async () => {
    const { sut, service } = makeSut()
    const spy = vi
      .spyOn(service, 'loadPaging')
      .mockImplementation(() => Promise.resolve([] as AnyDataModel[]))
    const data = {} as LoadDataPagingController.Request
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that controller to return http response equals to 200 on success', async () => {
    const { sut } = makeSut()
    const data = {} as LoadDataPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(200)
  })

  test('Ensure that controller to return http response 204 when there is no data', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'loadPaging').mockImplementationOnce(async () => {
      return Promise.resolve(null as unknown as AnyDataModel[])
    })
    const data = {} as LoadDataPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(204)
  })

  test('Ensure that controller to return http response equals to 400 on MissingParamsError error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'loadPaging').mockImplementationOnce(() =>
      throwError(new MissingParamsError('Error')),
    )
    const data = {} as LoadDataPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(400)
  })

  test('Ensure that controller to return http response equals to 500 on Unknown error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'loadPaging').mockImplementationOnce(() => throwError())
    const data = {} as LoadDataPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(500)
  })
})
