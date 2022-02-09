import express, { Application } from 'express';
import cors from 'cors';
import { ContainerModule, inject, injectable } from 'inversify';
import { TYPES } from './configs/types';
import { AuthMiddleware, morganMiddleware } from './middlewares';
import { logger } from './utils';

@injectable()
export class App implements IApp {

  private app: Application;

  @inject(TYPES.AuthMiddleware)
  private readonly authMiddleware: AuthMiddleware;

  public getExpressApp(): Application {
    logger.info('Running App.getExpressApp');

    if (!this.app) {
      this.app = express();
    }

    return this.app;
  }

  public mountMiddlewares(app: Application): void {
    logger.info('Running App.mountMiddlewares');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(morganMiddleware);
  }

}

export const appModule = new ContainerModule((bind) => {
  bind<IApp>(TYPES.App).to(App);
});

export interface IApp {
  getExpressApp(): Application;

  mountMiddlewares(app: Application): void;
}
