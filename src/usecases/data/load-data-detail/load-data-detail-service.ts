import {
  LoadDataDetailProtocol,
  LoadDataDetailRepositoryProtocol,
} from './protocols'

export class DbLoadDataDetail implements LoadDataDetailProtocol {
  constructor(
    private readonly loadDataRepository: LoadDataDetailRepositoryProtocol,
  ) {}

  async load(id: string): Promise<LoadDataDetailProtocol.Result> {
    return this.loadDataRepository.loadById(id)
  }
}
