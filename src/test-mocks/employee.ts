/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  randFullName,
  randGitCommitMessage,
  randRecentDate,
  randText,
  randUuid,
  randWord,
} from '@ngneat/falso'

import {
  CreateEmployeeModel,
  EmployeeModel,
  LoadEmployeeDetailRepositoryProtocol,
  LoadEmployeePagingRepositoryProtocol,
  LoadEmployeeRepositoryProtocol,
  EditEmployeeRepositoryProtocol,
  CreateEmployeeRepositoryProtocol,
  DeleteEmployeeRepositoryProtocol,
  EditEmployeeModel,
  CreateEmployeeProtocol,
  EditEmployeeProtocol,
  DeleteEmployeeProtocol,
  DeleteEmployeeModel,
  LoadEmployeeProtocol,
  LoadEmployeePagingProtocol,
  LoadEmployeeDetailProtocol,
} from '@usecases'
import { ValidatorProtocol } from '@utils'

export const mockCreateEmployeeParams = (): CreateEmployeeModel.Params => ({
  name: randText(),
  date: randRecentDate(),
  welcomeMessage: randText(),
})

export const mockEditEmployeeParams = (
  id: string,
): EditEmployeeModel.Params => ({
  id,
  name: randText(),
  date: randRecentDate(),
  welcomeMessage: randText(),
})

export const mockEmployeeModel = (): EmployeeModel => {
  return {
    id: randUuid(),
    name: randText(),
    date: randRecentDate(),
    welcomeMessage: randText(),
  }
}

export const mockLoadEmployeeParams = (): EmployeeModel[] => {
  return [
    {
      id: randUuid(),
      name: randText(),
      date: randRecentDate(),
      welcomeMessage: randText(),
    },
    {
      id: randUuid(),
      name: randText(),
      date: randRecentDate(),
      welcomeMessage: randText(),
    },
  ]
}

export class CreateEmployeeSpy implements CreateEmployeeProtocol {
  async map(
    params: CreateEmployeeModel.Params,
  ): Promise<CreateEmployeeModel.Params> {
    return Promise.resolve(params)
  }

  result = mockEmployeeModel()

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateEmployeeModel.Params,
  ): Promise<CreateEmployeeProtocol.Result> {
    return this.result
  }
}
export class EditEmployeeSpy implements EditEmployeeProtocol {
  result = mockEditEmployeeParams('1')

  async edit(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: string,
    params: EdiEmployeeModel.Params,
  ): Promise<EditEmployeeProtocol.Result> {
    return this.result
  }
}

export class LoadEmployeeSpy implements LoadEmployeeProtocol {
  result = [mockEmployeeModel(), mockEmployeeModel()]
  load(): Promise<LoadEmployeeProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class LoadEmployeePagingSpy implements LoadEmployeePagingProtocol {
  result = [mockEmployeeModel(), mockEmployeeModel()]
  loadPaging(): Promise<LoadEmployeePagingProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class LoadEmployeeDetailSpy implements LoadEmployeeDetailProtocol {
  result = mockEmployeeModel()
  load(): Promise<LoadEmployeeDetailProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class DeleteEmployeeSpy implements DeleteEmployeeProtocol {
  async map(
    params: DeleteEmployeeModel.Params,
  ): Promise<DeleteEmployeeModel.Params> {
    return Promise.resolve({ id: params.id })
  }

  result = { success: true, count: 1 }

  async delete(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: DeleteEmployeeModel.Params,
  ): Promise<DeleteEmployeeProtocol.Result> {
    return this.result
  }
}

export class LoadEmployeeRepositorySpy
  implements LoadEmployeeRepositoryProtocol
{
  result = [mockEmployeeModel()]

  async loadAll(): Promise<LoadEmployeeRepositoryProtocol.Result> {
    return this.result
  }
}

export class LoadEmployeeDetailRepositorySpy
  implements LoadEmployeeDetailRepositoryProtocol
{
  result = mockEmployeeModel()

  async loadById(): Promise<LoadEmployeeDetailRepositoryProtocol.Result> {
    return this.result
  }
}

export class EditEmployeeRepositorySpy
  implements EditEmployeeRepositoryProtocol
{
  result: EmployeeModel | null = null
  async edit(
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: EditEmployeeRepositoryProtocol.Params,
  ): Promise<EditEmployeeRepositoryProtocol.Result> {
    this.result = mockEditEmployeeParams(id)
    return { ...this.result, id: '1' }
  }
}

export class CreateEmployeeRepositorySpy
  implements CreateEmployeeRepositoryProtocol
{
  result = mockEmployeeModel()

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateEmployeeRepositoryProtocol.Params,
  ): Promise<CreateEmployeeRepositoryProtocol.Result> {
    return this.result
  }
}

export class DeleteEmployeeRepositorySpy
  implements DeleteEmployeeRepositoryProtocol
{
  result = { success: true, count: 1 }

  async delete({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id,
  }: DeleteEmployeeRepositoryProtocol.Params): Promise<DeleteEmployeeRepositoryProtocol.Result> {
    return { success: true, count: 1 }
  }
}

export class LoadEmployeePagingRepositorySpy
  implements LoadEmployeePagingRepositoryProtocol
{
  result = [mockEmployeeModel()]

  async loadPaging(): Promise<LoadEmployeePagingRepositoryProtocol.Result> {
    return this.result
  }
}

export class EmployeeValidatorSpy<T> implements ValidatorProtocol<T> {
  validate(schema: object, values: any): Promise<ValidatorProtocol.Result> {
    return Promise.resolve({
      success: true,
    })
  }
}
