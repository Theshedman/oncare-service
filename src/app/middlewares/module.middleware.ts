import { ContainerModule } from 'inversify';
import { TYPES } from '../configs/types';
import { AuthMiddleware } from './auth';
import { CacheMiddleware } from './cache';
import { IMiddleware } from './interfaces';

export const middlewareModule = new ContainerModule((bind) => {
  bind<IMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
  bind<IMiddleware>(TYPES.CacheMiddleware).to(CacheMiddleware);
});
