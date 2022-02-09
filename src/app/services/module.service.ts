import { ContainerModule } from 'inversify';
import { TYPES } from '../configs/types';
import { IAuthService } from '../middlewares';
import { AuthService } from './auths';
import { RedisService } from './redis';
import { UserService } from './users';

export const serviceModule = new ContainerModule((bind) => {
  bind<UserService>(TYPES.UserService).to(UserService);
  bind<IAuthService>(TYPES.AuthService).to(AuthService);
  bind<RedisService>(TYPES.RedisService).to(RedisService);
})
