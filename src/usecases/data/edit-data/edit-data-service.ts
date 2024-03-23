import { EditDataModel } from '@usecases'
import { EditDataProtocol, EditDataRepositoryProtocol } from './protocols'
import { ValidatorProtocol } from '@utils'

export class DbEditData implements EditDataProtocol {
  constructor(
    private readonly editDataRepository: EditDataRepositoryProtocol,
    private readonly editDataValidator: ValidatorProtocol<EditDataRepositoryProtocol.Params>,
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
    this.editDataValidator.validate({
      id,
      name,
      welcomeMessage,
      date,
    })

    const params = await this.map({
      id,
      name,
      welcomeMessage,
      date,
    })

    return this.editDataRepository.edit(id, params)
  }
}
