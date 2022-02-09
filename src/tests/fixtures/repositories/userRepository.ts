import { injectable } from 'inversify';
import { IUserModel } from '../../../app/models';
import { TestBaseRepository } from './baseRepository';


const userData: IUserModel[] = [
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@gmail.com",
    "phone": "08130096255",
    "id": "a1e70e05-259b-44c5-94a0-60471004fa72",
    "role": "user",
    "password": "123456",
    "created_at": "2022-02-09T14:47:38.066Z",
    "updated_at": "2022-02-09T14:47:38.066Z"
  },
  {
    "first_name": "Emmanuel",
    "last_name": "Johnson",
    "email": "emmanuel.johnson@gmail.com",
    "phone": "08135346256",
    "id": "aa8d227f-73c9-4ff2-8109-c88531f84be3",
    "role": "user",
    "password": "abcd1234",
    "created_at": "2022-02-09T14:47:38.066Z",
    "updated_at": "2022-02-09T14:47:38.066Z"
  }
];

@injectable()
export class TestUserRepository extends TestBaseRepository {
  constructor() {
    super(userData);
  }
}
