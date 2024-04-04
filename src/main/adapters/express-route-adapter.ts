import { Controller } from '@presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, response: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
      originalUrl: `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`,
    }

    const httpResponse = await controller.handle(request, response)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      })
    }
  }
}
