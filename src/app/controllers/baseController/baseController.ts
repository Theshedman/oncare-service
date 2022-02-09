import { Response } from 'express';
import { injectable } from 'inversify';
import { GenericError, logger } from '../../utils';

@injectable()
export class BaseController {
  protected success(res: Response, data: any, message: string, statusCode: number = 200) {
    logger.info('Running BaseController.success');

    res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  }

  protected error(res: Response, err: GenericError) {
    logger.info('Running BaseController.error');

    const { code, message } = err;

    res.status(code || 500).json({
      status: 'error',
      message,
    });
  }
}
