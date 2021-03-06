import { inject, injectable } from 'inversify';
import { TYPES } from '../../configs/types';
import { IAuthService } from '../../middlewares';
import { IUserModel, IUserOptionalModel } from '../../models';
import { DbAccess } from '../../repositories';
import { logger, Utils } from '../../utils';
import { GenericError } from '../../utils';
import { Password } from '../../utils/password';
import { IUserService } from './userService.interface';
import { v4 as uuid } from 'uuid';

@injectable()
export class UserService implements IUserService {
  @inject(TYPES.UserRepository)
  private userRepository: DbAccess;
  @inject(TYPES.AuthService)
  private authService: IAuthService;
  @inject(TYPES.Utils)
  private utils: Utils;

  public async create(data: IUserModel): Promise<any> {
    logger.info('Running UserService.create');

    data.id = uuid();

    const isValidEmail = this.utils.validateEmail(data.email);

    if (!isValidEmail) {
      throw new GenericError('Invalid email address', 400);
    }

    let existingUser: IUserOptionalModel = await this.userRepository.findOne({ email: data.email });

    if (!existingUser) {
      existingUser = await this.userRepository.findOne({ phone: data.phone });
    }

    if (existingUser) {
      throw new GenericError('User already exists', 400);
    }

    data.password = await Password.hash(data.password);

    const newUser: IUserOptionalModel = await this.userRepository.create(data);

    delete newUser.password;

    const token = this.authService.generateJwtToken({ email: newUser.email!, id: newUser.id! });


    return {
      user: newUser,
      auth_token: token,
    }
  }

  public delete(id: string): Promise<any> {
    logger.info('Running UserService.delete');

    return this.userRepository.delete(id);
  }

  public async findAll(): Promise<IUserModel[]> {
    logger.info('Running UserService.findAll');

    const users: IUserModel[] = await this.userRepository.findAll();

    users.forEach((user: IUserOptionalModel) => {
      delete user.password;
    });

    return users;
  }

  public async findById(id: string): Promise<IUserModel> {
    logger.info('Running UserService.findById');

    const user: IUserOptionalModel = await this.userRepository.findById(id);

    delete user.password;

    return user as IUserModel;
  }

  public async findOne(data: IUserOptionalModel): Promise<IUserOptionalModel> {
    logger.info('Running UserService.findOne');

    const user: IUserOptionalModel = await this.userRepository.findOne(data);

    delete user.password;

    return user as IUserModel;
  }

  public async update(id: string, data: IUserOptionalModel): Promise<IUserModel> {
    logger.info('Running UserService.update');

    const user: IUserOptionalModel = await this.userRepository.update(id, data);

    delete user.password;

    return user as IUserModel;
  }
}
