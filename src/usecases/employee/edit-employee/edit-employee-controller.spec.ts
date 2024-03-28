import { describe, expect, test, vi } from 'vitest'
import {
  EditEmployeeSpy,
  mockEditEmployeeParams,
  throwError,
} from '@test-mocks'

import {
  EmployeeModel,
  EditEmployeeController,
  MissingParamsError,
} from '@usecases'

type SutTypes = {
  sut: EditEmployeeController
  service: EditEmployeeSpy
}
const makeSut = (): SutTypes => {
  const service = new EditEmployeeSpy()
  const sut = new EditEmployeeController(service)
  return {
    sut,
    service,
  }
}

describe('Test Suite for edit-employee-service.spec', () => {
  test('Ensure that edit in service is called once and with same parameters', async () => {
    const { sut, service } = makeSut()
    const spy = vi
      .spyOn(service, 'edit')
      .mockImplementation(() => Promise.resolve({} as EmployeeModel))
    const data = mockEditEmployeeParams('1')
    await sut.handle(data)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('1', data)
  })

  test('Ensure that controller to return http response equals to 200 on success', async () => {
    const { sut } = makeSut()
    const data = mockEditEmployeeParams('1')
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(200)
  })

  test('Ensure that controller to return http response 204 when there is no data', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'edit').mockImplementationOnce(async () => {
      return Promise.resolve(null as unknown as EmployeeModel)
    })
    const data = mockEditEmployeeParams('1')
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(204)
  })

  test('Ensure that controller to return http response equals to 400 on MissingParamsError error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'edit').mockImplementationOnce(() =>
      throwError(new MissingParamsError('Error')),
    )
    const data = mockEditEmployeeParams('1')
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(400)
  })

  test('Ensure that controller to return http response equals to 500 on Unknown error', async () => {
    const { sut, service } = makeSut()
    vi.spyOn(service, 'edit').mockImplementationOnce(() => throwError())
    const data = mockEditEmployeeParams('1')
    const result = await sut.handle(data)
    expect(result.statusCode).toEqual(500)
  })
})
