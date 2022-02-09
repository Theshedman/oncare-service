import { ContainerModule } from 'inversify';
import { TYPES } from '../configs/types';
import { BaseRepository, DbAccess } from './baseRepository';
import { UserRepository } from './users';

export const repositoryModule = new ContainerModule((bind) => {
  bind<DbAccess>(TYPES.UserRepository).to(UserRepository);
  bind<DbAccess>(TYPES.BaseRepository).to(BaseRepository);
})
