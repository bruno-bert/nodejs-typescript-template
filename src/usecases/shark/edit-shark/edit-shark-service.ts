import { EditSharkModel } from '@usecases'
import { EditSharkProtocol, EditSharkRepositoryProtocol } from './protocols'
import { ValidatorProtocol } from '@utils'
import { schema } from './edit-shark-service-schema'

export class DbEditShark implements EditSharkProtocol {
  constructor(
    private readonly EditSharkRepository: EditSharkRepositoryProtocol,
    private readonly EditSharkValidator: ValidatorProtocol<EditSharkRepositoryProtocol.Params>,
  ) {}

  async map({
    id,
    name,
    date,
    welcomeMessage,
  }: EditSharkModel.Params): Promise<EditSharkRepositoryProtocol.Params> {
    return {
      id,
      name,
      date,
      welcomeMessage,
    }
  }

  async edit(
    id: string,
    { name, date, welcomeMessage }: EditSharkModel.Params,
  ): Promise<EditSharkProtocol.Result> {
    this.EditSharkValidator.validate(schema, {
      id,
      name,
      date,
      welcomeMessage,
    })

    const params = await this.map({
      id,
      name,
      date,
      welcomeMessage,
    })

    return this.EditSharkRepository.edit(id, params)
  }
}
