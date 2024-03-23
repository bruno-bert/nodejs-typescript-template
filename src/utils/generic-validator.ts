export interface GenericValidator {
  validate: (params: any) => Promise<any>
}
