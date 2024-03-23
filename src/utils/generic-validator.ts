export interface GenericValidator {
  validate: (schema: any, values: any) => Promise<any>
}
