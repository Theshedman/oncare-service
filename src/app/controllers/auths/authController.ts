import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request, response } from 'inversify-express-utils';
import { TYPES } from '../../configs/types';
import { IAuthService } from '../../middlewares';
import { logger } from '../../utils';
import { BaseController } from '../baseController';

@controller('/auth')
export class AuthController extends BaseController {
  @inject(TYPES.AuthService)
  private authService: IAuthService;

  @httpPost('/login')
  public async login(@request() req: Request, @response() res: Response): Promise<void> {
    logger.info('Running AuthController.login');

    try {
      const { email, password } = req.body;
      const authData = await this.authService.login(email, password);

      this.success(res, authData, 'Login Successful');
    } catch (e: any) {
      logger.error(`Unable to login`);
      this.error(res, e);
    }
  }
}
