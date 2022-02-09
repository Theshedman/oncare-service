import 'reflect-metadata';
import { config as dotConfig } from 'dotenv';
import { Migration } from '../../runKnexMigration';
import { Env } from './configs/env';
import { appServer } from './server';
import { logger } from './utils';

dotConfig();

class Server {

  public start() {
    logger.info('Running Server.start');

    const PORT = Env.getAll().port;

    // run knex migration
    Migration.run() /* this will run all knex migration to setup the db */

    if (!module.parent) {
      appServer.listen(PORT, () => {
        logger.info('')
        logger.info('===========================');
        logger.info(`  Listening on port: ${PORT}`);
        logger.info('===========================');
        logger.info('');
      });
    }
  }
}

new Server().start();
