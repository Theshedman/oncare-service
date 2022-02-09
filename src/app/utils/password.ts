import bcrypt from 'bcryptjs';
import { logger } from './loggerUtil';

export class Password {
  public static async hash(password: string): Promise<string> {
    logger.info('Running Password.hash');

    return await bcrypt.hash(password, 10);
  }

  public static async compare(password: string, hash: string): Promise<boolean> {
    logger.info('Running Password.compare');

    return await bcrypt.compare(password, hash);
  }
}
