/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const swaggerJSDoc = require('swagger-jsdoc')
const { Bootprint } = require('bootprint/index')
const bootprintOpenApi = require('bootprint-openapi')

async function generateSwaggerDocs() {
  const apis = [
    './src/main/routes/*.ts',
    './src/main/routes/*.js',
    './src/main/routes/**/*.ts',
    './src/main/routes/**/*.js',
  ]
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'My Application',
      version: '0.0.1',
      description: 'My Application Description',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Author Name',
        url: 'https://author.com',
        email: 'author@author.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5050',
        description: 'Development server',
      },
    ],
  }
  const options = {
    swaggerDefinition,
    apis,
  }

  const spec = swaggerJSDoc(options)
  const specString = JSON.stringify(spec, null, 2)
  const filePath = `./src/open-api-specification.json`
  const outputDocsDir = `./src/docs`

  fs.writeFileSync(filePath, specString, 'utf-8')
  await new Bootprint(bootprintOpenApi).run(filePath, outputDocsDir)
}

// Call the function
generateSwaggerDocs()
