import { ContainerModule } from 'inversify';
import { TYPES } from '../configs/types';
import { AuthController } from './auths';
import { UserController } from './users';

export const controllerModule = new ContainerModule((bind) => {
  bind<UserController>(TYPES.UserController).to(UserController);
  bind<AuthController>(TYPES.AuthController).to(AuthController);
})
