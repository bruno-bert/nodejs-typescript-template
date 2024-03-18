import {
  randFullName,
  randGitCommitMessage,
  randRecentDate,
  randText,
  randUuid,
  randWord,
} from '@ngneat/falso'
import {
  AddAnyDataModel,
  AnyDataModel,
  LoadDataRepositoryProtocol,
} from '@usecases'

export const mockAddDataParams = (): AddAnyDataModel.Params => ({
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
