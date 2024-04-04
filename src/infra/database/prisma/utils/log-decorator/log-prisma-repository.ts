import { LogErrorRepository } from '@main/decorators'
import { PrismaHelper } from '../prisma-helper'

export class LogPrismaRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await PrismaHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date(),
    })
  }
}
