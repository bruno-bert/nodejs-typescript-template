import { MongoHelper } from '@infra/mongodb/utils/mongo-helper'
import { LogErrorRepository } from '@main/decorators'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date(),
    })
  }
}
