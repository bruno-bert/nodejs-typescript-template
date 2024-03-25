module.exports = (plop) => {
  plop.setHelper('mockFields', (fields) => {
    const arrayOfFields = fields.split(',').map((field) => field.trim())
    let text = ''
    for (let i = 0; i < arrayOfFields.length; i++) {
      const field = arrayOfFields[i]
      let name = ''
      let type = ''
      try {
        name = field.split(':')[0]
        type = field.split(':')[1]
      } catch (error) {
        name = field
        type = 'string'
      }

      if (String(name).includes('id')) {
        text += `${name}: randUuid(),\n`
      } else {
        switch (type) {
          case 'string':
          case 'text': {
            text += `${name}: randText(),\n`
            break
          }
          case 'number':
          case 'float':
          case 'decimal': {
            text += `${name}: randNumber(),\n`
            break
          }
          case 'date':
          case 'datetime': {
            text += `${name}: randRecentDate(),\n`
            break
          }
          default: {
            text += `${name}: randText(),\n`
            break
          }
        }
      }
    }
    return text
  })

  plop.setHelper('listFieldNames', (fields) => {
    const arrayOfFields = fields.split(',').map((field) => field.trim())
    let text = ''
    for (let i = 0; i < arrayOfFields.length; i++) {
      const field = arrayOfFields[i]
      let name = ''
      try {
        name = field.split(':')[0]
      } catch (error) {
        name = field
      }

      text += `${name},\n`
    }
    return text
  })

  plop.setHelper('listFieldsTypescript', (fields) => {
    const arrayOfFields = fields.split(',').map((field) => field.trim())
    let text = ''
    for (let i = 0; i < arrayOfFields.length; i++) {
      const field = arrayOfFields[i]
      let name = ''
      let type = ''
      try {
        name = field.split(':')[0]
        type = field.split(':')[1]
      } catch (error) {
        name = field
        type = 'string'
      }

      if (String(name).includes('id')) {
        text += `${name}: string\n`
      } else {
        switch (type) {
          case 'string':
          case 'text': {
            text += `${name}: string\n`
            break
          }
          case 'number':
          case 'float':
          case 'decimal': {
            text += `${name}: number\n`
            break
          }
          case 'date':
          case 'datetime': {
            text += `${name}: Date\n`
            break
          }
          default: {
            text += `${name}: string\n`
            break
          }
        }
      }
    }
    return text
  })

  plop.setHelper('listFieldsJsonSchema', (fields) => {
    const arrayOfFields = fields.split(',').map((field) => field.trim())
    let text = ''
    for (let i = 0; i < arrayOfFields.length; i++) {
      const field = arrayOfFields[i]
      let name = ''
      let type = ''
      try {
        name = field.split(':')[0]
        type = field.split(':')[1]
      } catch (error) {
        name = field
        type = 'string'
      }

      if (String(name).includes('id')) {
        text += `${name}: {\n`
        text += `type: 'string', \n`
        text += `}\n`
      } else {
        switch (type) {
          case 'string':
          case 'text': {
            text += `${name}: {\n`
            text += `type: 'string', \n`
            text += `}\n`
            break
          }
          case 'number':
          case 'float':
          case 'decimal': {
            text += `${name}: {\n`
            text += `type: 'number', \n`
            text += `}\n`
            break
          }
          case 'date':
          case 'datetime': {
            text += `${name}: {\n`
            text += `type: 'string', \n`
            text += `format: 'date-time', \n`
            text += `}\n`
            break
          }
          default: {
            text += `${name}: {\n`
            text += `type: 'string', \n`
            text += `}\n`
            break
          }
        }
      }
    }
    return text
  })

  plop.setHelper('listFieldsJsonSchemaRequiredList', (fields) => {
    const arrayOfFields = fields.split(',').map((field) => field.trim())
    let text = ''
    for (let i = 0; i < arrayOfFields.length; i++) {
      const field = arrayOfFields[i]
      let name = ''
      try {
        name = field.split(':')[0]
      } catch (error) {
        name = field
      }

      text += `'${name}', `
    }
    return text
  })

  plop.setGenerator('domain', {
    description: 'Add a new domain with basic operations',
    prompts: [
      {
        type: 'input',
        name: 'name',
        default: 'employee',
        message: 'What is your domain name?',
      },
      {
        type: 'input',
        name: 'fields',
        default: 'name:string,date:date,welcomeMessage:string',
        message: 'Fields of the domain <name:type - comma separated>',
      },
    ],
    actions: [
      /** FACTORIES */
      {
        type: 'append',
        path: '../../src/main/factories/index.ts',
        templateFile: 'templates/factories/index.ts.hbs',
        unique: true,
      },
      {
        type: 'add',
        path: '../../src/main/factories/{{kebabCase name}}/index.ts',
        templateFile: 'templates/factories/[domain]/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/factories/{{kebabCase name}}/create-{{kebabCase name}}-factory.ts',
        templateFile: 'templates/factories/[domain]/create-factory.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/factories/{{kebabCase name}}/edit-{{kebabCase name}}-factory.ts',
        templateFile: 'templates/factories/[domain]/edit-factory.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/factories/{{kebabCase name}}/delete-{{kebabCase name}}-factory.ts',
        templateFile: 'templates/factories/[domain]/delete-factory.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/factories/{{kebabCase name}}/load-{{kebabCase name}}-factory.ts',
        templateFile: 'templates/factories/[domain]/load-factory.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/factories/{{kebabCase name}}/load-{{kebabCase name}}-detail-factory.ts',
        templateFile: 'templates/factories/[domain]/load-detail-factory.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/factories/{{kebabCase name}}/load-{{kebabCase name}}-paging-factory.ts',
        templateFile: 'templates/factories/[domain]/load-paging-factory.ts.hbs',
      },

      /** ROUTES */
      {
        type: 'add',
        path: '../../src/main/routes/{{kebabCase name}}/index.ts',
        templateFile: 'templates/routes/[domain]/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/routes/{{kebabCase name}}/create-{{kebabCase name}}.route.ts',
        templateFile: 'templates/routes/[domain]/create.route.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/routes/{{kebabCase name}}/edit-{{kebabCase name}}.route.ts',
        templateFile: 'templates/routes/[domain]/edit.route.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/routes/{{kebabCase name}}/delete-{{kebabCase name}}.route.ts',
        templateFile: 'templates/routes/[domain]/delete.route.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/routes/{{kebabCase name}}/load-{{kebabCase name}}.route.ts',
        templateFile: 'templates/routes/[domain]/load.route.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/routes/{{kebabCase name}}/load-{{kebabCase name}}-detail.route.ts',
        templateFile: 'templates/routes/[domain]/load-detail.route.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/routes/{{kebabCase name}}/load-{{kebabCase name}}-paging.route.ts',
        templateFile: 'templates/routes/[domain]/load-paging.route.ts.hbs',
      },

      /** TEST-MOCKS */
      {
        type: 'add',
        path: '../../src/test-mocks/{{kebabCase name}}.ts',
        templateFile: 'templates/test-mocks/[domain].ts.hbs',
      },
      {
        type: 'append',
        path: '../../src/test-mocks/index.ts',
        templateFile: 'templates/test-mocks/index.ts.hbs',
      },
    ],
  })
}
