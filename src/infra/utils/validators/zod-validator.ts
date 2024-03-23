import { ValidatorProtocol } from '@utils'

export class ZodValidator implements ValidatorProtocol<any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(params: any): Promise<ValidatorProtocol.Result> {
    try {
      console.log(`test`)
      return { success: true }
    } catch (error) {
      throw new Error('test')
    }
  }
}
