import { describe, expect, test } from 'vitest'
import { ZodValidator } from './zod-validator'
import { JSONSchema4 } from 'json-schema'

const makeSut = () => {
  return {
    sut: new ZodValidator(),
  }
}

const makeMockSchema = (): JSONSchema4 => {
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 10,
      },
      welcomeMessage: {
        type: 'string',
      },
      date: {
        type: 'string',
        format: 'date-time',
      },
    },
    required: ['name', 'welcomeMessage'],
    additionalProperties: false,
  }
}

describe('Test Suite for zod-validator.spec', () => {
  test('Ensure that validator returns success', async () => {
    const { sut } = makeSut()
    const schema = makeMockSchema()
    const values = { name: 'test', welcomeMessage: 'test' }
    const result = await sut.validate(schema, values)
    expect(result.success).toBe(true)
  })

  test('Ensure that validator returns false when welcomeMessage is not populated', async () => {
    const { sut } = makeSut()
    const schema = makeMockSchema()
    const values = { name: 'test' }
    const result = await sut.validate(schema, values)
    expect(result.success).toBe(false)
  })

  test('Ensure that validator returns false when name is not populated', async () => {
    const { sut } = makeSut()
    const schema = makeMockSchema()
    const values = { welcomeMessage: 'test' }
    const result = await sut.validate(schema, values)
    expect(result.success).toBe(false)
  })

  test('Ensure that validator returns false when name is chars are less than 2', async () => {
    const { sut } = makeSut()
    const schema = makeMockSchema()
    const values = { name: 'a', welcomeMessage: 'test' }
    const result = await sut.validate(schema, values)
    expect(result.success).toBe(false)
  })
})
