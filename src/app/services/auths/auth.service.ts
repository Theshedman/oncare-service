import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { Env, IEnv } from '../../configs/env';
import { TYPES } from '../../configs/types';
import { IAuthService } from '../../middlewares';
import { IUserModel, IUserOptionalModel } from '../../models';
import { DbAccess } from '../../repositories';
import { GenericError, logger } from '../../utils';
import { Password } from '../../utils/password';
import { IJwtPayload } from './auth.interface';

@injectable()
export class AuthService implements IAuthService {
  @inject(TYPES.UserRepository)
  private userRepository: DbAccess;
  private readonly env: IEnv;

  constructor() {
    this.env = Env.getAll();
  }

  // login
  public async login(email: string, password: string): Promise<any> {
    logger.info('Running AuthService.login');

    const user: IUserOptionalModel = await this.userRepository.findOne({ email });

    if (!user) {
      throw new GenericError('Invalid email or password', 401);
    }

    const isValidPassword = await Password.compare(password, user.password!);

    if (!isValidPassword) {
      throw new GenericError('Invalid email or password', 401);
    }

    const token = this.generateJwtToken({ email, id: user.id });


    return {
      user,
      auth_token: token,
    }
  }

  // generate jwt token
  public generateJwtToken(data: IJwtPayload): string {
    logger.info('Running AuthService.generateJwtToken');

    try {
      const { id } = data;
      delete data.id;
      return jwt.sign(data, this.env.jwt_secret, {
        audience: id,
      });
    } catch (e: any) {
      if (typeof e.code === 'string' || !e.code) {
        e.code = 500;
      }
      throw new GenericError(e.message, e.code);
    }
  }

  // decode jwt token
  public decodeJwtToken(token: string): object | string | IJwtPayload {
    logger.info('Running AuthService.decodeJwtToken');

    try {
      return jwt.verify(token, this.env.jwt_secret);
    } catch (e: any) {
      if (typeof e.code === 'string' || !e.code) {
        e.code = 500;
      }
      throw new GenericError(e.message, e.code);
    }
  }
}
