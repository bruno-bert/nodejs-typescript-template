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
} from '@usecases'

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
