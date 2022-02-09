import { JSONSchema } from 'objection';
import { BaseModel } from '../baseModel';
import { IUserModel } from './userModel.interface';
import { UserModelValidation } from './userModel.validation';

export class UserModel extends BaseModel implements IUserModel {
  public id: IUserModel['id'];
  public first_name: IUserModel['first_name'];
  public last_name: IUserModel['last_name'];
  public email: IUserModel['email'];
  public password: IUserModel['password'];
  public role: IUserModel['role'];
  public phone: IUserModel['phone'];

  static get tableName() {
    return 'oncare-service.users';
  }

  public static get jsonSchema(): JSONSchema {
    return UserModelValidation;
  }
}
