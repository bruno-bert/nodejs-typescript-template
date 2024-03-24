import { badRequest, serverError } from '@presentation/helpers'
import { HttpResponse } from '@presentation/protocols'
import { MissingParamsError } from '@usecases'

export const errorToHttpResponse = (error: Error): HttpResponse => {
  if (error instanceof MissingParamsError) return badRequest(error)
  return serverError(error as Error)
}
