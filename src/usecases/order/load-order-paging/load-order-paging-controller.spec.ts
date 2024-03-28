import { describe, expect, test, vi } from 'vitest'
import { LoadOrderPagingSpy, throwError } from '@test-mocks'

import {
  OrderModel,
  LoadOrderPagingController,
  MissingParamsError,
} from '@usecases'

type SutTypes = {
  sut: LoadOrderPagingController
  service: LoadOrderPagingSpy
}
const makeSut = (): SutTypes => {
  const service = new LoadOrderPagingSpy()
  const sut = new LoadOrderPagingController(service)
  return {
    sut,
    service,
  }
}

describe('Test Suite for load-order-paging-service.spec', () => {
  test('Ensure that load order paging in service is called once and with same parameters', async () => {
    const { sut, service } = makeSut()
    const spy = vi
      .spyOn(service, 'loadPaging')
      .mockImplementation(() => Promise.resolve([] as OrderModel[]))
    const data = {} as LoadOrderPagingController.Request
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that controller to return http response equals to 200 on success', async () => {
    const { sut } = makeSut()
    const data = {} as LoadOrderPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(200)
  })

  test('Ensure that controller to return http response 204 when there is no data', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'loadPaging').mockImplementationOnce(async () => {
      return Promise.resolve(null as unknown as OrderModel[])
    })
    const data = {} as LoadOrderPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(204)
  })

  test('Ensure that controller to return http response equals to 400 on MissingParamsError error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'loadPaging').mockImplementationOnce(() =>
      throwError(new MissingParamsError('Error')),
    )
    const data = {} as LoadOrderPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(400)
  })

  test('Ensure that controller to return http response equals to 500 on Unknown error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'loadPaging').mockImplementationOnce(() => throwError())
    const data = {} as LoadOrderPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(500)
  })
})
