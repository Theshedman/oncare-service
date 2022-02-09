import { createServer } from 'http';
import { InversifyExpressServer } from 'inversify-express-utils';
import { IApp } from './app';
import { container } from './configs/inversity.config';
import { TYPES } from './configs/types';
import { logger } from './utils';

class ServerSetup {
  private readonly app: IApp;
  private serverInstance: any;
  private readonly server: InversifyExpressServer;

  constructor() {
    this.app = container.get<IApp>(TYPES.App);
    this.server = new InversifyExpressServer(container, null, null, this.app.getExpressApp());
  }

  public getServer(): any {
    logger.info('Running ServerSetup.getServer');

    if (!this.serverInstance) {
      this.serverInstance = createServer(this.setServer());
    }

    return this.serverInstance;
  }

  private setServer() {
    logger.info('Running ServerSetup.setServer');

    const server = new InversifyExpressServer(container, null, null, this.app.getExpressApp());

    server.setConfig((app) => {

      this.app.mountMiddlewares(app);

    });

    return server.build();
  }
}


const appServer = new ServerSetup().getServer();

export { appServer };
