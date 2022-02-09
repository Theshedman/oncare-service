import { IUserModel, IUserOptionalModel } from '../../models';

export interface IUserService {
  create(data: IUserModel): Promise<IUserModel>;

  findAll(): Promise<IUserModel[]>;

  findOne(data: IUserOptionalModel): Promise<IUserOptionalModel>;

  findById(id: string): Promise<IUserModel>;

  update(id: string, data: IUserOptionalModel): Promise<IUserModel>;

  delete(id: string): Promise<any>;
}
