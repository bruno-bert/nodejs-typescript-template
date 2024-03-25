import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupDocs from './docs'
import express from 'express'

const app = express()
/** render html must come before set the middleware of content-type */
setupDocs(app)
setupMiddlewares(app)
setupRoutes(app)

export default app
