import { EditDataModel } from '@usecases'
import { EditDataProtocol, EditDataRepositoryProtocol } from './protocols'

export class DbEditData implements EditDataProtocol {
  constructor(
    private readonly editDataRepository: EditDataRepositoryProtocol,
  ) {}

  async map({
    id,
    name,
    welcomeMessage,
    date,
  }: EditDataModel.Params): Promise<EditDataRepositoryProtocol.Params> {
    return {
      id,
      name,
      welcomeMessage,
      date,
    }
  }

  async edit(
    id: string,
    { name, welcomeMessage, date }: EditDataModel.Params,
  ): Promise<EditDataProtocol.Result> {
    const params = await this.map({
      id,
      name,
      welcomeMessage,
      date,
    })

    return this.editDataRepository.edit(id, params)
  }
}
