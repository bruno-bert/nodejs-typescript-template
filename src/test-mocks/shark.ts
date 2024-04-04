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
  CreateSharkModel,
  SharkModel,
  LoadSharkDetailRepositoryProtocol,
  LoadSharkPagingRepositoryProtocol,
  LoadSharkRepositoryProtocol,
  EditSharkRepositoryProtocol,
  CreateSharkRepositoryProtocol,
  DeleteSharkRepositoryProtocol,
  EditSharkModel,
  CreateSharkProtocol,
  EditSharkProtocol,
  DeleteSharkProtocol,
  DeleteSharkModel,
  LoadSharkProtocol,
  LoadSharkPagingProtocol,
  LoadSharkDetailProtocol,
  CreateSharkController,
  EditSharkController,
} from '@usecases'
import { ValidatorProtocol } from '@utils'

export const mockCreateSharkRequest = (): CreateSharkController.Request => ({
  name: randText(),
  date: randRecentDate().toISOString(),
  welcomeMessage: randText(),
})

export const mockEditSharkRequest = (
  id: string,
): EditSharkController.Request => ({
  id,
  name: randText(),
  date: randRecentDate().toISOString(),
  welcomeMessage: randText(),
})

export const mockCreateSharkPagingParams =
  (): LoadSharkPagingRepositoryProtocol.Params => {
    return {
      usePagination: false,
      sortDefaultField: '',
      originalUrl: 'https://localhost:5050/api/shark-paging',
      query: {
        page: 0,
        itemsPerPage: 0,
      },
      body: {
        filters: undefined,
        orderBy: undefined,
        select: undefined,
        include: undefined,
      },
    }
  }
export const mockCreateSharkParams = (): CreateSharkModel.Params => ({
  name: randText(),
  date: randRecentDate(),
  welcomeMessage: randText(),
})

export const mockEditSharkParams = (id: string): EditSharkModel.Params => ({
  id,
  name: randText(),
  date: randRecentDate(),
  welcomeMessage: randText(),
})

export const mockSharkModel = (): SharkModel => {
  return {
    id: randUuid(),
    name: randText(),
    date: randRecentDate(),
    welcomeMessage: randText(),
  }
}

export const mockLoadSharkParams = (): SharkModel[] => {
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

export class CreateSharkSpy implements CreateSharkProtocol {
  async map(params: CreateSharkModel.Params): Promise<CreateSharkModel.Params> {
    return Promise.resolve(params)
  }

  result = mockSharkModel()

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateSharkModel.Params,
  ): Promise<CreateSharkProtocol.Result> {
    return this.result
  }
}
export class EditSharkSpy implements EditSharkProtocol {
  result = mockEditSharkParams('1')

  async edit(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: string,
    params: EditSharkModel.Params,
  ): Promise<EditSharkProtocol.Result> {
    return this.result
  }
}

export class LoadSharkSpy implements LoadSharkProtocol {
  result = [mockSharkModel(), mockSharkModel()]
  load(): Promise<LoadSharkProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class LoadSharkPagingSpy implements LoadSharkPagingProtocol {
  result = {
    data: [mockSharkModel(), mockSharkModel()],
    metadata: { page: 1, itemsPerPage: 10, totalRecords: 2, nextPageUrl: null },
  }

  loadPaging(): Promise<LoadSharkPagingProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class LoadSharkDetailSpy implements LoadSharkDetailProtocol {
  result = mockSharkModel()
  load(): Promise<LoadSharkDetailProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class DeleteSharkSpy implements DeleteSharkProtocol {
  async map(params: DeleteSharkModel.Params): Promise<DeleteSharkModel.Params> {
    return Promise.resolve({ id: params.id })
  }

  result = { success: true, count: 1 }

  async delete(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: DeleteSharkModel.Params,
  ): Promise<DeleteSharkProtocol.Result> {
    return this.result
  }
}

export class LoadSharkRepositorySpy implements LoadSharkRepositoryProtocol {
  result = [mockSharkModel()]

  async loadAll(): Promise<LoadSharkRepositoryProtocol.Result> {
    return this.result
  }
}

export class LoadSharkDetailRepositorySpy
  implements LoadSharkDetailRepositoryProtocol
{
  result = mockSharkModel()

  async loadById(): Promise<LoadSharkDetailRepositoryProtocol.Result> {
    return this.result
  }
}

export class EditSharkRepositorySpy implements EditSharkRepositoryProtocol {
  result: SharkModel | null = null
  async edit(
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: EditSharkRepositoryProtocol.Params,
  ): Promise<EditSharkRepositoryProtocol.Result> {
    this.result = mockEditSharkParams(id)
    return { ...this.result, id: '1' }
  }
}

export class CreateSharkRepositorySpy implements CreateSharkRepositoryProtocol {
  result = mockSharkModel()

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateSharkRepositoryProtocol.Params,
  ): Promise<CreateSharkRepositoryProtocol.Result> {
    return this.result
  }
}

export class DeleteSharkRepositorySpy implements DeleteSharkRepositoryProtocol {
  result = { success: true, count: 1 }

  async delete({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id,
  }: DeleteSharkRepositoryProtocol.Params): Promise<DeleteSharkRepositoryProtocol.Result> {
    return { success: true, count: 1 }
  }
}

export class LoadSharkPagingRepositorySpy
  implements LoadSharkPagingRepositoryProtocol
{
  result = {
    data: [mockSharkModel()],
    metadata: { page: 1, itemsPerPage: 10, nextPageUrl: null, totalRecords: 1 },
  }

  async loadPaging(): Promise<LoadSharkPagingRepositoryProtocol.Result> {
    return this.result
  }
}

export class SharkValidatorSpy<T> implements ValidatorProtocol<T> {
  validate(schema: object, values: any): Promise<ValidatorProtocol.Result> {
    return Promise.resolve({
      success: true,
    })
  }
}
