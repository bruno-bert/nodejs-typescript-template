module.exports = (plop) => {
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
        name: 'plural',
        default: 'employees',
        message: 'What is the plurals?',
      },
      {
        type: 'input',
        name: 'fields',
        default: 'name:string|email:string|hireDate:string',
        message:
          'Domain fields in this format: name:string|email:string|hireDate:string',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../../src/main/factories/{{kebabCase name}}/index.ts',
        templateFile: 'templates/factories/index.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/factories/{{kebabCase name}}/load-{{kebabCase name}}-factory.ts',
        templateFile: 'templates/factories/load-factory.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/main/factories/{{kebabCase name}}/load-detail-{{kebabCase name}}-factory.ts',
        templateFile: 'templates/factories/load-detail-factory.ts.hbs',
      },
    ],
  })
}
