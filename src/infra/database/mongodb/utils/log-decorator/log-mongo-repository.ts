import { LogErrorRepository } from '@main/decorators'
import { MongoHelper } from '../mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date(),
    })
  }
}
