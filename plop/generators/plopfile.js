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
        text += `},\n`
      } else {
        switch (type) {
          case 'string':
          case 'text': {
            text += `${name}: {\n`
            text += `type: 'string', \n`
            text += `},\n`
            break
          }
          case 'number':
          case 'float':
          case 'decimal': {
            text += `${name}: {\n`
            text += `type: 'number', \n`
            text += `},\n`
            break
          }
          case 'date':
          case 'datetime': {
            text += `${name}: {\n`
            text += `type: 'string', \n`
            text += `format: 'date-time', \n`
            text += `},\n`
            break
          }
          default: {
            text += `${name}: {\n`
            text += `type: 'string', \n`
            text += `},\n`
            break
          }
        }
      }
    }

    return plop.renderString(text)
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

  plop.setHelper('listFieldsForTests', (fields) => {
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

      text += `expect(result.${name}).toEqual(item.${name})\n`
    }
    return text
  })

  plop.setHelper('listForMongoQuery', (fields) => {
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

      text += `${name} : 1, \n`
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

      /** INFRA - DATABASE - MONGODB */
      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/index.ts',
        templateFile: 'templates/infra/database/mongodb/[domain]/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/create-{{kebabCase name}}/index.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/create/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/create-{{kebabCase name}}/mongo-create-{{kebabCase name}}-repository.spec.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/create/mongo-create-repository.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/create-{{kebabCase name}}/mongo-create-{{kebabCase name}}-repository.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/create/mongo-create-repository.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/delete-{{kebabCase name}}/index.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/delete/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/delete-{{kebabCase name}}/mongo-delete-{{kebabCase name}}-repository.spec.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/delete/mongo-delete-repository.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/delete-{{kebabCase name}}/mongo-delete-{{kebabCase name}}-repository.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/delete/mongo-delete-repository.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/edit-{{kebabCase name}}/index.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/edit/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/edit-{{kebabCase name}}/mongo-edit-{{kebabCase name}}-repository.spec.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/edit/mongo-edit-repository.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/edit-{{kebabCase name}}/mongo-edit-{{kebabCase name}}-repository.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/edit/mongo-edit-repository.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/load-{{kebabCase name}}/index.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/load/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/load-{{kebabCase name}}/mongo-load-{{kebabCase name}}-repository.spec.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/load/mongo-load-repository.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/load-{{kebabCase name}}/mongo-load-{{kebabCase name}}-repository.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/load/mongo-load-repository.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/load-{{kebabCase name}}-detail/index.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/load-detail/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/load-{{kebabCase name}}-detail/mongo-load-{{kebabCase name}}-detail-repository.spec.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/load-detail/mongo-load-detail-repository.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/load-{{kebabCase name}}-detail/mongo-load-{{kebabCase name}}-detail-repository.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/load-detail/mongo-load-detail-repository.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/load-{{kebabCase name}}-paging/index.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/load-paging/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/load-{{kebabCase name}}-paging/mongo-load-{{kebabCase name}}-paging-repository.spec.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/load-paging/mongo-load-paging-repository.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/infra/database/mongodb/{{kebabCase name}}/load-{{kebabCase name}}-paging/mongo-load-{{kebabCase name}}-paging-repository.ts',
        templateFile:
          'templates/infra/database/mongodb/[domain]/load-paging/mongo-load-paging-repository.ts.hbs',
      },

      /** USE CASES  */
      {
        type: 'append',
        path: '../../src/usecases/index.ts',
        templateFile: 'templates/usecases/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/index.ts',
        templateFile: 'templates/usecases/[domain]/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/{{kebabCase name}}-model.ts',
        templateFile: 'templates/usecases/[domain]/model.ts.hbs',
      },

      /** USE CASES - CREATE */
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/index.ts',
        templateFile: 'templates/usecases/[domain]/create/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/errors/index.ts',
        templateFile: 'templates/usecases/[domain]/create/errors/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/errors/create-{{kebabCase name}}-error.ts',
        templateFile:
          'templates/usecases/[domain]/create/errors/create-error.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/protocols/index.ts',
        templateFile:
          'templates/usecases/[domain]/create/protocols/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/protocols/create-{{kebabCase name}}-repository-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/create/protocols/create-repository-protocol.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/protocols/create-{{kebabCase name}}-usecase-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/create/protocols/create-usecase-protocol.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/create-{{kebabCase name}}-controller.spec.ts',
        templateFile:
          'templates/usecases/[domain]/create/create-controller.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/create-{{kebabCase name}}-controller.ts',
        templateFile:
          'templates/usecases/[domain]/create/create-controller.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/create-{{kebabCase name}}-model.ts',
        templateFile: 'templates/usecases/[domain]/create/create-model.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/create-{{kebabCase name}}-service.spec.ts',
        templateFile:
          'templates/usecases/[domain]/create/create-service.spec.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/create-{{kebabCase name}}-service.ts',
        templateFile:
          'templates/usecases/[domain]/create/create-service.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/create-{{kebabCase name}}/create-{{kebabCase name}}-service-schema.ts',
        templateFile:
          'templates/usecases/[domain]/create/create-service-schema.ts.hbs',
      },

      /** USE CASES - DELETE */

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/index.ts',
        templateFile: 'templates/usecases/[domain]/delete/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/errors/index.ts',
        templateFile: 'templates/usecases/[domain]/delete/errors/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/errors/delete-{{kebabCase name}}-error.ts',
        templateFile:
          'templates/usecases/[domain]/delete/errors/delete-error.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/protocols/index.ts',
        templateFile:
          'templates/usecases/[domain]/delete/protocols/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/protocols/delete-{{kebabCase name}}-repository-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/delete/protocols/delete-repository-protocol.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/protocols/delete-{{kebabCase name}}-usecase-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/delete/protocols/delete-usecase-protocol.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/delete-{{kebabCase name}}-controller.spec.ts',
        templateFile:
          'templates/usecases/[domain]/delete/delete-controller.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/delete-{{kebabCase name}}-controller.ts',
        templateFile:
          'templates/usecases/[domain]/delete/delete-controller.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/delete-{{kebabCase name}}-model.ts',
        templateFile: 'templates/usecases/[domain]/delete/delete-model.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/delete-{{kebabCase name}}-service.spec.ts',
        templateFile:
          'templates/usecases/[domain]/delete/delete-service.spec.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/delete-{{kebabCase name}}-service.ts',
        templateFile:
          'templates/usecases/[domain]/delete/delete-service.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/delete-{{kebabCase name}}/delete-{{kebabCase name}}-service-schema.ts',
        templateFile:
          'templates/usecases/[domain]/delete/delete-service-schema.ts.hbs',
      },

      /** USE CASES - EDIT */

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/index.ts',
        templateFile: 'templates/usecases/[domain]/edit/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/errors/index.ts',
        templateFile: 'templates/usecases/[domain]/edit/errors/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/errors/edit-{{kebabCase name}}-error.ts',
        templateFile:
          'templates/usecases/[domain]/edit/errors/edit-error.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/protocols/index.ts',
        templateFile: 'templates/usecases/[domain]/edit/protocols/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/protocols/edit-{{kebabCase name}}-repository-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/edit/protocols/edit-repository-protocol.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/protocols/edit-{{kebabCase name}}-usecase-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/edit/protocols/edit-usecase-protocol.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/edit-{{kebabCase name}}-controller.spec.ts',
        templateFile:
          'templates/usecases/[domain]/edit/edit-controller.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/edit-{{kebabCase name}}-controller.ts',
        templateFile: 'templates/usecases/[domain]/edit/edit-controller.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/edit-{{kebabCase name}}-model.ts',
        templateFile: 'templates/usecases/[domain]/edit/edit-model.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/edit-{{kebabCase name}}-service.spec.ts',
        templateFile:
          'templates/usecases/[domain]/edit/edit-service.spec.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/edit-{{kebabCase name}}-service.ts',
        templateFile: 'templates/usecases/[domain]/edit/edit-service.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/edit-{{kebabCase name}}/edit-{{kebabCase name}}-service-schema.ts',
        templateFile:
          'templates/usecases/[domain]/edit/edit-service-schema.ts.hbs',
      },

      /** USE CASES - LOAD */

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}/index.ts',
        templateFile: 'templates/usecases/[domain]/load/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}/errors/index.ts',
        templateFile: 'templates/usecases/[domain]/load/errors/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}/errors/load-{{kebabCase name}}-error.ts',
        templateFile:
          'templates/usecases/[domain]/load/errors/load-error.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}/protocols/index.ts',
        templateFile: 'templates/usecases/[domain]/load/protocols/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}/protocols/load-{{kebabCase name}}-repository-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/load/protocols/load-repository-protocol.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}/protocols/load-{{kebabCase name}}-usecase-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/load/protocols/load-usecase-protocol.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}/load-{{kebabCase name}}-controller.spec.ts',
        templateFile:
          'templates/usecases/[domain]/load/load-controller.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}/load-{{kebabCase name}}-controller.ts',
        templateFile: 'templates/usecases/[domain]/load/load-controller.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}/load-{{kebabCase name}}-model.ts',
        templateFile: 'templates/usecases/[domain]/load/load-model.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}/load-{{kebabCase name}}-service.spec.ts',
        templateFile:
          'templates/usecases/[domain]/load/load-service.spec.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}/load-{{kebabCase name}}-service.ts',
        templateFile: 'templates/usecases/[domain]/load/load-service.ts.hbs',
      },

      /** USE CASES - LOAD DETAIL */

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/index.ts',
        templateFile: 'templates/usecases/[domain]/load-detail/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/errors/index.ts',
        templateFile:
          'templates/usecases/[domain]/load-detail/errors/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/errors/load-{{kebabCase name}}-detail-error.ts',
        templateFile:
          'templates/usecases/[domain]/load-detail/errors/load-detail-error.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/protocols/index.ts',
        templateFile:
          'templates/usecases/[domain]/load-detail/protocols/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/protocols/load-{{kebabCase name}}-detail-repository-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/load-detail/protocols/load-detail-repository-protocol.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/protocols/load-{{kebabCase name}}-detail-usecase-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/load-detail/protocols/load-detail-usecase-protocol.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/load-{{kebabCase name}}-detail-controller.spec.ts',
        templateFile:
          'templates/usecases/[domain]/load-detail/load-detail-controller.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/load-{{kebabCase name}}-detail-controller.ts',
        templateFile:
          'templates/usecases/[domain]/load-detail/load-detail-controller.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/load-{{kebabCase name}}-detail-model.ts',
        templateFile:
          'templates/usecases/[domain]/load-detail/load-detail-model.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/load-{{kebabCase name}}-detail-service.spec.ts',
        templateFile:
          'templates/usecases/[domain]/load-detail/load-detail-service.spec.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/load-{{kebabCase name}}-detail-service.ts',
        templateFile:
          'templates/usecases/[domain]/load-detail/load-detail-service.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-detail/load-{{kebabCase name}}-detail-service-schema.ts',
        templateFile:
          'templates/usecases/[domain]/load-detail/load-detail-service-schema.ts.hbs',
      },

      /** USE CASES - LOAD PAGING */

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-paging/index.ts',
        templateFile: 'templates/usecases/[domain]/load-paging/index.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-paging/errors/index.ts',
        templateFile:
          'templates/usecases/[domain]/load-paging/errors/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-paging/errors/load-{{kebabCase name}}-paging-error.ts',
        templateFile:
          'templates/usecases/[domain]/load-paging/errors/load-paging-error.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-paging/protocols/index.ts',
        templateFile:
          'templates/usecases/[domain]/load-paging/protocols/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-paging/protocols/load-{{kebabCase name}}-paging-repository-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/load-paging/protocols/load-paging-repository-protocol.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-paging/protocols/load-{{kebabCase name}}-paging-usecase-protocol.ts',
        templateFile:
          'templates/usecases/[domain]/load-paging/protocols/load-paging-usecase-protocol.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-paging/load-{{kebabCase name}}-paging-controller.spec.ts',
        templateFile:
          'templates/usecases/[domain]/load-paging/load-paging-controller.spec.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-paging/load-{{kebabCase name}}-paging-controller.ts',
        templateFile:
          'templates/usecases/[domain]/load-paging/load-paging-controller.ts.hbs',
      },

      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-paging/load-{{kebabCase name}}-paging-model.ts',
        templateFile:
          'templates/usecases/[domain]/load-paging/load-paging-model.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-paging/load-{{kebabCase name}}-paging-service.spec.ts',
        templateFile:
          'templates/usecases/[domain]/load-paging/load-paging-service.spec.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/usecases/{{kebabCase name}}/load-{{kebabCase name}}-paging/load-{{kebabCase name}}-paging-service.ts',
        templateFile:
          'templates/usecases/[domain]/load-paging/load-paging-service.ts.hbs',
      },
    ],
  })
}
