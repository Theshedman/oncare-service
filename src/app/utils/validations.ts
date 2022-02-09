import { injectable } from 'inversify';
import { logger } from './loggerUtil';

@injectable()
export class Utils {
  public validateEmail(email: string): boolean {
    logger.info('Running Utils.validateEmail');

    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      return domain.indexOf('.') !== -1;
    }
    return false;
  }
}
