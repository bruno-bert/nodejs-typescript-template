import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const API_DEFAULT_PREFIX = 'api'

  const router = Router()

  app.use(`/${API_DEFAULT_PREFIX}`, router)

  readdirSync(path.join(__dirname, '../routes')).map(async (directory) => {
    readdirSync(path.join(__dirname, '../routes', directory)).map(
      async (file) => {
        if (!file.endsWith('.map') && !file.startsWith('index')) {
          // console.log(`file`, file)
          ;(await import(`../routes/${directory}/${file}`)).default(router)
        }
      },
    )
  })
}
