export const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    date: {
      type: 'string',
      format: 'date',
    },
    welcomeMessage: {
      type: 'string',
    },
  },
  required: ['name', 'date', 'welcomeMessage'],
  additionalProperties: false,
}
