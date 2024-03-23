export const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    welcomeMessage: {
      type: 'string',
    },
    date: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['name', 'welcomeMessage'],
  additionalProperties: false,
}
