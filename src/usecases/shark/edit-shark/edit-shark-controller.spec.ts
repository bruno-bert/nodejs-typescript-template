import { describe, expect, test, vi } from 'vitest'
import { EditSharkSpy, mockEditSharkRequest, throwError } from '@test-mocks'

import { SharkModel, MissingParamsError } from '@usecases'
import { EditSharkController } from './edit-shark-controller'

type SutTypes = {
  sut: EditSharkController
  service: EditSharkSpy
}
const makeSut = (): SutTypes => {
  const service = new EditSharkSpy()
  const sut = new EditSharkController(service)
  return {
    sut,
    service,
  }
}

describe('Test Suite for edit-shark-service.spec', () => {
  test('Ensure that edit in service is called once', async () => {
    const { sut, service } = makeSut()
    const spy = vi
      .spyOn(service, 'edit')
      .mockImplementation(() => Promise.resolve({} as SharkModel))
    const data = mockEditSharkRequest('1')
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
  })

  test('Ensure that controller to return http response equals to 200 on success', async () => {
    const { sut } = makeSut()
    const data = mockEditSharkRequest('1')
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(200)
  })

  test('Ensure that controller to return http response 204 when there is no data', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'edit').mockImplementationOnce(async () => {
      return Promise.resolve(null as unknown as SharkModel)
    })
    const data = mockEditSharkRequest('1')
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(204)
  })

  test('Ensure that controller to return http response equals to 400 on MissingParamsError error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'edit').mockImplementationOnce(() =>
      throwError(new MissingParamsError('Error')),
    )
    const data = mockEditSharkRequest('1')
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(400)
  })

  test('Ensure that controller to return http response equals to 500 on Unknown error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'edit').mockImplementationOnce(() => throwError())
    const data = mockEditSharkRequest('1')
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(500)
  })
})
