export const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    orderId: {
      type: 'string',
    },
    manufacturerId: {
      type: 'string',
    },
    purchaseDate: {
      type: 'string',
      format: 'date-time',
    },
    productId: {
      type: 'string',
    },
  },
  required: ['orderId', 'manufacturerId', 'purchaseDate', 'productId'],
  additionalProperties: false,
}
