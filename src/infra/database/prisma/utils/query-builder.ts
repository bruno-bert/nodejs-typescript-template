export class PrismaQueryBuilder {
  private readonly query: any[] = []

  private addStep(step: string, data: object): PrismaQueryBuilder {
    this.query.push({
      [step]: data,
    })
    return this
  }

  match(data: object): PrismaQueryBuilder {
    return this.addStep('$match', data)
  }

  group(data: object): PrismaQueryBuilder {
    return this.addStep('$group', data)
  }

  sort(data: object): PrismaQueryBuilder {
    return this.addStep('$sort', data)
  }

  unwind(data: object): PrismaQueryBuilder {
    return this.addStep('$unwind', data)
  }

  lookup(data: object): PrismaQueryBuilder {
    return this.addStep('$lookup', data)
  }

  project(data: object): PrismaQueryBuilder {
    return this.addStep('$project', data)
  }

  build(): object[] {
    return this.query
  }
}
