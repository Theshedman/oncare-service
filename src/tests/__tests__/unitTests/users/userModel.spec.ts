import { Model } from 'objection';
import { UserModel, BaseModel } from '../../../../app/models';

describe('User Model Unit Test', () => {

  it('should be defined', () => {
    expect(UserModel).toBeDefined();
  });

  it('should be an instance of a BaseModel', () => {
    expect(UserModel.prototype).toBeInstanceOf(BaseModel);
  });

  it('should be an instance of a Model', () => {
    expect(UserModel.prototype).toBeInstanceOf(Model);
  });

  it('should have a tableName', () => {
    expect(UserModel.tableName).toBe('oncare-service.users');
  });

  it('should have a jsonSchema', () => {
    expect(UserModel.jsonSchema).toBeDefined();
    expect(UserModel.jsonSchema).toEqual({
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
        }
      }
    });
  });
});
