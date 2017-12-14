import { RxJsonSchema, RxSchema } from 'rxdb';

const userJSSchema: RxJsonSchema =  {
  title: 'User schema',
  description: 'Database schema for users',
  version: 0,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true,
    },
    fullName: {
      type: 'string',
    },
  },
  required: ['fullName'],
};

export const userSchema = RxSchema.create(userJSSchema);
