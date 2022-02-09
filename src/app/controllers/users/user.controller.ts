import { inject } from 'inversify';
import { Request, Response } from 'express';
import {
  httpGet, httpPost,
  controller, httpDelete,
  httpPut, request, response
} from 'inversify-express-utils';
import { TYPES } from '../../configs/types';
import { RedisService, UserService } from '../../services';
import { logger } from '../../utils';
import { BaseController } from '../baseController';

@controller('/users')
export class UserController extends BaseController {
  @inject(TYPES.UserService)
  private userService: UserService;
  @inject(TYPES.RedisService)
  private redisService: RedisService;


  @httpPost('/')
  public async createUser(@request() req: Request, @response() res: Response) {
    logger.info('Running UserController.createUser');

    try {
      const user = await this.userService.create(req.body);

      // cache user data for 15s
      await this.redisService.set(user.id, user, 15);

      this.success(res, user, 'User created successfully', 201);
    } catch (e: any) {
      logger.error('Error creating user', e);
      this.error(res, e);
    }
  }

  @httpGet('/', TYPES.AuthMiddleware)
  public async getUsers(@request() req: Request, @response() res: Response) {
    logger.info('Running UserController.getUsers');
    try {
      const users = await this.userService.findAll();

      this.success(res, users, 'Users retrieved successfully', 200);
    } catch (e: any) {
      logger.error('Error getting users', e);
      this.error(res, e);
    }
  }

  @httpGet('/:id', TYPES.AuthMiddleware, TYPES.CacheMiddleware)
  public async getUserById(@request() req: Request, @response() res: Response) {
    logger.info('Running UserController.getUserById');

    try {
      const user = await this.userService.findById(req.params.id);

      console.log('Fetching from the db');

      // cache users data for 15s
      await this.redisService.set(user.id, user, 15);

      this.success(res, user, 'User retrieved successfully', 200);
    } catch (e: any) {
      logger.error('Error getting user by id', e);
      this.error(res, e);
    }

  }

  @httpPut('/:id', TYPES.AuthMiddleware)
  public async updateUser(@request() req: Request, @response() res: Response) {
    logger.info('Running UserController.updateUser');

    try {
      const user = await this.userService.update(req.params.id, req.body);

      this.success(res, user, 'User updated successfully', 200);
    } catch (e: any) {
      logger.error('Error updating user', e);
      this.error(res, e);
    }
  }

  @httpDelete('/:id', TYPES.AuthMiddleware)
  public async deleteUser(@request() req: Request, @response() res: Response) {
    logger.info('Running UserController.deleteUser');

    try {
      const user = await this.userService.delete(req.params.id);

      this.success(res, user, 'User deleted successfully', 200);
    } catch (e: any) {
      logger.error('Error deleting user', e);
      this.error(res, e);
    }
  }
}
