import { ContainerModule } from 'inversify';
import { TYPES } from '../configs/types';
import { Utils } from './validations';

export const utilModule = new ContainerModule((bind) => {
  bind<Utils>(TYPES.Utils).to(Utils);
})
