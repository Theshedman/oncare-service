import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { TYPES } from '../configs/types';
import { IUserModel } from '../models';
import { IUserService } from '../services/users/userService.interface';
import { logger } from '../utils';
import { CastJWTDecodedType, IMiddleware, IAuthService } from './interfaces';

@injectable()
export class AuthMiddleware extends BaseMiddleware implements IMiddleware {

  @inject(TYPES.UserService)
  private readonly userService: IUserService;
  @inject(TYPES.AuthService)
  private readonly authService: IAuthService;

  public async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
    logger.info('Running AuthMiddleware.handler');

    try {
      const jwtPayload: CastJWTDecodedType = this.decodeJwtToken(req);
      res.locals.user = await this.getUserPayload(jwtPayload);

      next();
    } catch (e: any) {
      logger.error('Error authenticating user', e);

      res.status(401).send({
        status: 'error',
        code: 401,
        message: 'Unable to authenticate'
      });
    }
  }

  private decodeJwtToken(req: Request): CastJWTDecodedType {
    logger.info('Running AuthMiddleware.decodeJwtToken');

    const requestHeaderAuthorization: string = req.headers.authorization as string;


    if (!requestHeaderAuthorization) {
      throw new Error('Unable to authenticate.');
    }

    const [authBearer, token] = requestHeaderAuthorization.split(' ');

    if (authBearer !== 'Bearer') {
      throw new Error('Unable to authenticate.');
    }

    const decoded = this.authService.decodeJwtToken(token);

    return decoded as CastJWTDecodedType;
  }

  private async getUserPayload(payload: CastJWTDecodedType): Promise<IUserModel> {
    logger.info('Running AuthMiddleware.getUserPayload');

    let user: IUserModel = await this.userService.findById(payload.aud);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
