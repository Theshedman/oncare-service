import { Container } from 'inversify';
import { appModule } from '../app';
import { controllerModule } from '../controllers';
import { middlewareModule } from '../middlewares';
import { utilModule } from '../utils';
import { serviceModule } from '../services';
import { repositoryModule } from '../repositories';

const container = new Container();

container.load(
  appModule,
  utilModule,
  serviceModule,
  middlewareModule,
  controllerModule,
  repositoryModule,
);

export { container };
