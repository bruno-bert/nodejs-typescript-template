export type AnyDataModel = {
  id: string
  name: string
  welcomeMessage: string
  date: Date
}

export namespace AddAnyDataModel {
  export type Params = Omit<AnyDataModel, 'id'>
}
