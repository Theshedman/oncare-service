import { injectable } from 'inversify';
import { UserModel } from '../../models';
import { BaseRepository } from '../baseRepository';

@injectable()
export class UserRepository extends BaseRepository {
  constructor() {
    // @ts-ignore
    super(UserModel);
  }
}
