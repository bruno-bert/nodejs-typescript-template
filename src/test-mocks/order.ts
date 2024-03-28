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
  CreateOrderModel,
  OrderModel,
  LoadOrderDetailRepositoryProtocol,
  LoadOrderPagingRepositoryProtocol,
  LoadOrderRepositoryProtocol,
  EditOrderRepositoryProtocol,
  CreateOrderRepositoryProtocol,
  DeleteOrderRepositoryProtocol,
  EditOrderModel,
  CreateOrderProtocol,
  EditOrderProtocol,
  DeleteOrderProtocol,
  DeleteOrderModel,
  LoadOrderProtocol,
  LoadOrderPagingProtocol,
  LoadOrderDetailProtocol,
} from '@usecases'
import { ValidatorProtocol } from '@utils'

export const mockCreateOrderParams = (): CreateOrderModel.Params => ({
  orderId: randText(),
  manufacturerId: randText(),
  purchaseDate: randRecentDate(),
  productId: randText(),
})

export const mockEditOrderParams = (id: string): EditOrderModel.Params => ({
  id,
  orderId: randText(),
  manufacturerId: randText(),
  purchaseDate: randRecentDate(),
  productId: randText(),
})

export const mockOrderModel = (): OrderModel => {
  return {
    id: randUuid(),
    orderId: randText(),
    manufacturerId: randText(),
    purchaseDate: randRecentDate(),
    productId: randText(),
  }
}

export const mockLoadOrderParams = (): OrderModel[] => {
  return [
    {
      id: randUuid(),
      orderId: randText(),
      manufacturerId: randText(),
      purchaseDate: randRecentDate(),
      productId: randText(),
    },
    {
      id: randUuid(),
      orderId: randText(),
      manufacturerId: randText(),
      purchaseDate: randRecentDate(),
      productId: randText(),
    },
  ]
}

export class CreateOrderSpy implements CreateOrderProtocol {
  async map(params: CreateOrderModel.Params): Promise<CreateOrderModel.Params> {
    return Promise.resolve(params)
  }

  result = mockOrderModel()

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateOrderModel.Params,
  ): Promise<CreateOrderProtocol.Result> {
    return this.result
  }
}
export class EditOrderSpy implements EditOrderProtocol {
  result = mockEditOrderParams('1')

  async edit(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: string,
    params: EdiOrderModel.Params,
  ): Promise<EditOrderProtocol.Result> {
    return this.result
  }
}

export class LoadOrderSpy implements LoadOrderProtocol {
  result = [mockOrderModel(), mockOrderModel()]
  load(): Promise<LoadOrderProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class LoadOrderPagingSpy implements LoadOrderPagingProtocol {
  result = [mockOrderModel(), mockOrderModel()]
  loadPaging(): Promise<LoadOrderPagingProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class LoadOrderDetailSpy implements LoadOrderDetailProtocol {
  result = mockOrderModel()
  load(): Promise<LoadOrderDetailProtocol.Result> {
    return Promise.resolve(this.result)
  }
}

export class DeleteOrderSpy implements DeleteOrderProtocol {
  async map(params: DeleteOrderModel.Params): Promise<DeleteOrderModel.Params> {
    return Promise.resolve({ id: params.id })
  }

  result = { success: true, count: 1 }

  async delete(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: DeleteOrderModel.Params,
  ): Promise<DeleteOrderProtocol.Result> {
    return this.result
  }
}

export class LoadOrderRepositorySpy implements LoadOrderRepositoryProtocol {
  result = [mockOrderModel()]

  async loadAll(): Promise<LoadOrderRepositoryProtocol.Result> {
    return this.result
  }
}

export class LoadOrderDetailRepositorySpy
  implements LoadOrderDetailRepositoryProtocol
{
  result = mockOrderModel()

  async loadById(): Promise<LoadOrderDetailRepositoryProtocol.Result> {
    return this.result
  }
}

export class EditOrderRepositorySpy implements EditOrderRepositoryProtocol {
  result: OrderModel | null = null
  async edit(
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: EditOrderRepositoryProtocol.Params,
  ): Promise<EditOrderRepositoryProtocol.Result> {
    this.result = mockEditOrderParams(id)
    return { ...this.result, id: '1' }
  }
}

export class CreateOrderRepositorySpy implements CreateOrderRepositoryProtocol {
  result = mockOrderModel()

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: CreateOrderRepositoryProtocol.Params,
  ): Promise<CreateOrderRepositoryProtocol.Result> {
    return this.result
  }
}

export class DeleteOrderRepositorySpy implements DeleteOrderRepositoryProtocol {
  result = { success: true, count: 1 }

  async delete({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id,
  }: DeleteOrderRepositoryProtocol.Params): Promise<DeleteOrderRepositoryProtocol.Result> {
    return { success: true, count: 1 }
  }
}

export class LoadOrderPagingRepositorySpy
  implements LoadOrderPagingRepositoryProtocol
{
  result = [mockOrderModel()]

  async loadPaging(): Promise<LoadOrderPagingRepositoryProtocol.Result> {
    return this.result
  }
}

export class OrderValidatorSpy<T> implements ValidatorProtocol<T> {
  validate(schema: object, values: any): Promise<ValidatorProtocol.Result> {
    return Promise.resolve({
      success: true,
    })
  }
}
