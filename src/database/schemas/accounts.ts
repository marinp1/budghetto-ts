import { RxJsonSchema, RxSchema } from 'rxdb';

const accountJSSchema: RxJsonSchema = {
  title: 'Account schema',
  description: 'Database schema for accounts',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    userId: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    bankName: {
      type: 'string',
    },
    vCardName: {
      type: 'string',
    },
    colour: {
      type: 'string',
    },
    startingBalance: {
      type: 'integer',
    },
    initiationDate: {
      type: 'string',
    },
    currencyType: {
      type: 'string',
    },
  },
  required: ['userId, name, bankName, colour',
    'startingBalance', 'initiationDate', 'currencyType'],
};

export const accountSchema = RxSchema.create(accountJSSchema);
