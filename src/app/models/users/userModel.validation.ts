export const UserModelValidation = {
  type: 'object',
  required: ['email', 'password', 'id', 'first_name', 'last_name', 'phone'],
  properties: {
    id: {
      type: 'string',
    },
    first_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    role: {
      type: 'string',
    },
  },
}
