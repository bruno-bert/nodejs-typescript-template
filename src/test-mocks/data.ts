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
  CreateDataModel,
  AnyDataModel,
  LoadDataDetailRepositoryProtocol,
  LoadDataPagingRepositoryProtocol,
  LoadDataRepositoryProtocol,
  EditDataRepositoryProtocol,
  CreateDataRepositoryProtocol,
  DeleteDataRepositoryProtocol,
  EditDataModel,
  CreateDataProtocol,
  EditDataProtocol,
  DeleteDataProtocol,
  DeleteDataModel,
  LoadDataProtocol,
  LoadDataPagingProtocol,
  LoadDataDetailProtocol,
} from '@usecases'
import { ValidatorProtocol } from '@utils'

export const mockCreateDataParams = (): CreateDataModel.Params => ({
  welcomeMessage: randText(),
  name: randFullName(),
  date: randRecentDate(),
})

export const mockEditDataParams = (id: string): EditDataModel.Params => ({
  id,
  welcomeMessage: randText(),
  name: randFullName(),
  date: randRecentDate(),
})

export const mockAnyDataModel = (): AnyDataModel => {
  return {
    id: randUuid(),
    name: randWord(),
    welcomeMessage: randGitCommitMessage(),
    date: randRecentDate(),
  }
}

export const mockLoadDataParams = (): AnyDataModel[] => {
  return [
    {
      id: randUuid(),
      name: randWord(),
      welcomeMessage: randGitCommitMessage(),
      date: randRecentDate(),
    },
    {
      id: randUuid(),
      name: randWord(),
      welcomeMessage: randGitCommitMessage(),
      date: randRecentDate(),
    },
  ]
}

export class CreateDataSpy implements CreateDataProtocol {
  async map(params: CreateDataModel.Params): Promise<CreateDataModel.Params> {
    return Promise.resolve(params)
  }

  result = mockAnyDataModel()

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateDataModel.Params,
  ): Promise<CreateDataProtocol.Result> {
    return this.result
  }
}
export class EditDataSpy implements EditDataProtocol {
  result = mockEditDataParams('1')

  async edit(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: string,
    params: EditDataModel.Params,
  ): Promise<EditDataProtocol.Result> {
    return this.result
  }
}

export class LoadDataSpy implements LoadDataProtocol {
  result = [mockAnyDataModel(), mockAnyDataModel()]
  load(): Promise<LoadDataProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class LoadDataPagingSpy implements LoadDataPagingProtocol {
  result = [mockAnyDataModel(), mockAnyDataModel()]
  loadPaging(): Promise<LoadDataPagingProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class LoadDataDetailSpy implements LoadDataDetailProtocol {
  result = mockAnyDataModel()
  load(): Promise<LoadDataDetailProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class DeleteDataSpy implements DeleteDataProtocol {
  async map(params: DeleteDataModel.Params): Promise<DeleteDataModel.Params> {
    return Promise.resolve({ id: params.id })
  }

  result = { success: true, count: 1 }

  async delete(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: DeleteDataModel.Params,
  ): Promise<DeleteDataProtocol.Result> {
    return this.result
  }
}

export class LoadDataRepositorySpy implements LoadDataRepositoryProtocol {
  result = [mockAnyDataModel()]

  async loadAll(): Promise<LoadDataRepositoryProtocol.Result> {
    return this.result
  }
}

export class LoadDataDetailRepositorySpy
  implements LoadDataDetailRepositoryProtocol
{
  result = mockAnyDataModel()

  async loadById(): Promise<LoadDataDetailRepositoryProtocol.Result> {
    return this.result
  }
}

export class EditDataRepositorySpy implements EditDataRepositoryProtocol {
  result: AnyDataModel | null = null
  async edit(
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: EditDataRepositoryProtocol.Params,
  ): Promise<EditDataRepositoryProtocol.Result> {
    this.result = mockEditDataParams(id)
    return { ...this.result, id: '1' }
  }
}

export class CreateDataRepositorySpy implements CreateDataRepositoryProtocol {
  result = mockAnyDataModel()

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateDataRepositoryProtocol.Params,
  ): Promise<CreateDataRepositoryProtocol.Result> {
    return this.result
  }
}
export class DataValidatorSpy<T> implements ValidatorProtocol<T> {
  validate(schema: object, values: any): Promise<ValidatorProtocol.Result> {
    return Promise.resolve({
      success: true,
    })
  }
}

export class DeleteDataRepositorySpy implements DeleteDataRepositoryProtocol {
  result = { success: true, count: 1 }

  async delete({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id,
  }: DeleteDataRepositoryProtocol.Params): Promise<DeleteDataRepositoryProtocol.Result> {
    return { success: true, count: 1 }
  }
}

export class LoadDataPagingRepositorySpy
  implements LoadDataPagingRepositoryProtocol
{
  result = [mockAnyDataModel()]

  async loadPaging(): Promise<LoadDataPagingRepositoryProtocol.Result> {
    return this.result
  }
}
