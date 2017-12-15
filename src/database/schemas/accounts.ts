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
    name: {
      type: 'string',
    },
    bankName: {
      type: 'string',
    },
    colour: {
      type: 'string',
    },
    startingBalance: {
      type: 'number',
    },
    initiationDate: {
      type: 'string',
    },
    currencyType: {
      type: 'string',
    },
  },
};

export const accountSchema = RxSchema.create(accountJSSchema);
