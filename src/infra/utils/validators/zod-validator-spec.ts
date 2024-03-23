import { describe, expect, test } from 'vitest'
import { ZodValidator } from './zod-validator'

const makeSut = () => {
  return {
    sut: new ZodValidator(),
  }
}

describe('Test Suite for zod-validator.spec', () => {
  test('Ensure that validator returns success', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({})
    expect(result.success).toBe(true)
  })
})
