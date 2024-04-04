import { describe, expect, test, vi } from 'vitest'
import { LoadSharkPagingSpy, throwError } from '@test-mocks'

import {
  SharkModel,
  LoadSharkPagingController,
  MissingParamsError,
} from '@usecases'

type SutTypes = {
  sut: LoadSharkPagingController
  service: LoadSharkPagingSpy
}
const makeSut = (): SutTypes => {
  const service = new LoadSharkPagingSpy()
  const sut = new LoadSharkPagingController(service)
  return {
    sut,
    service,
  }
}

describe('Test Suite for load-shark-paging-service.spec', () => {
  test('Ensure that load shark paging in service is called once', async () => {
    const { sut, service } = makeSut()
    const spy = vi.spyOn(service, 'loadPaging').mockImplementation(() =>
      Promise.resolve({
        data: [] as SharkModel[],
        metadata: {
          page: 1,
          itemsPerPage: 10,
          totalRecords: 1,
          nextPageUrl: null,
        },
      }),
    )
    const data = {} as LoadSharkPagingController.Request
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that controller to return http response equals to 200 on success', async () => {
    const { sut } = makeSut()
    const data = {} as LoadSharkPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(200)
  })

  test('Ensure that controller returns http response 204 when there is no data', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'loadPaging').mockImplementationOnce(async () => {
      return Promise.resolve({
        data: null,
        metadata: null,
      })
    })

    const data = {} as LoadSharkPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(204)
  })

  test('Ensure that controller to return http response equals to 400 on MissingParamsError error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'loadPaging').mockImplementationOnce(() =>
      throwError(new MissingParamsError('Error')),
    )
    const data = {} as LoadSharkPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(400)
  })

  test('Ensure that controller to return http response equals to 500 on Unknown error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'loadPaging').mockImplementationOnce(() => throwError())
    const data = {} as LoadSharkPagingController.Request
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(500)
  })
})
