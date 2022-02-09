import { NextFunction, Request, Response } from 'express';
import { IUserModel } from '../../models';
import { IJwtPayload } from '../../services/auths/auth.interface';

export interface IMiddleware {
  handler(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface CastJWTDecodedType {
  email: string;
  iat?: number;
  aud: string
}

export interface IAuthService {
  login(email: string, password: string): Promise<any>;

  generateJwtToken(data: IJwtPayload): string;

  decodeJwtToken(token: string): object | string | IJwtPayload;
}
