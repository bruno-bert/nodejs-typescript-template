import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '@open-api-specification.json'
import express, { Express } from 'express'
export default (app: Express): void => {
  app.use('/docs/v2', express.static('./src/docs'))
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
