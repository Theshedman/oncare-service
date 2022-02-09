import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { TYPES } from '../configs/types';
import { RedisService } from '../services';
import { logger } from '../utils';
import { IMiddleware } from './interfaces';

@injectable()
export class CacheMiddleware extends BaseMiddleware implements IMiddleware {

  @inject(TYPES.RedisService)
  private readonly redisService: RedisService;

  public async handler(req: Request, res: Response, next: NextFunction): Promise<any> {
    logger.info('Running CacheMiddleware.handler');

    try {
      const { id } = req.params;
      const result = await this.redisService.get(id);

      if (result) {
        logger.info('Return cached result');
        return res.json(JSON.parse(result));
      }

      return next();
    } catch (e: any) {
      throw new Error;
    }
  }
}
