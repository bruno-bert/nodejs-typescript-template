import { describe, expect, test, vi } from 'vitest'
import { DeleteSharkSpy, throwError } from '@test-mocks'

import {
  SharkModel,
  DeleteSharkController,
  MissingParamsError,
} from '@usecases'
import { DeleteSharkNotFoundError } from './errors'

type SutTypes = {
  sut: DeleteSharkController
  service: DeleteSharkSpy
}
const makeSut = (): SutTypes => {
  const service = new DeleteSharkSpy()
  const sut = new DeleteSharkController(service)
  return {
    sut,
    service,
  }
}

describe('Test Suite for delete-shark-controller.spec', () => {
  test('Ensure that delete in service is called once and with same parameters', async () => {
    const { sut, service } = makeSut()
    const spy = vi
      .spyOn(service, 'delete')
      .mockImplementation(() => Promise.resolve({ success: true, count: 1 }))
    const data = { id: '1' }
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(data)
  })

  test('Ensure that map in controller is called once in handler and with same parameters', async () => {
    const { sut } = makeSut()
    const spy = vi
      .spyOn(sut, 'map')
      .mockImplementation(() => Promise.resolve({} as SharkModel))
    const data = { id: '1' }
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith(data)
  })

  test('Ensure that controller to return http response equals to 200 on success', async () => {
    const { sut } = makeSut()
    const data = { id: '1' }
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(200)
  })

  test('Ensure that controller to return http response 204 when there is no data', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'delete').mockImplementationOnce(async () => {
      return Promise.resolve(
        null as unknown as { success: boolean; count: number },
      )
    })
    const data = { id: '1' }
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(204)
  })

  test('Ensure that controller to return http response 404 when id is not found', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'delete').mockImplementationOnce(() =>
      throwError(new DeleteSharkNotFoundError('Error')),
    )
    const data = { id: '1' }
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(404)
  })

  test('Ensure that controller to return http response equals to 400 on MissingParamsError error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'delete').mockImplementationOnce(() =>
      throwError(new MissingParamsError('Error')),
    )
    const data = { id: '1' }
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(400)
  })

  test('Ensure that controller to return http response equals to 500 on Unknown error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'delete').mockImplementationOnce(() => throwError())
    const data = { id: '1' }
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(500)
  })
})
