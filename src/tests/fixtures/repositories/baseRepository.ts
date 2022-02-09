import { injectable, unmanaged } from 'inversify';
import _ from 'lodash';
import { DbAccess } from '../../../app/repositories';

@injectable()
export class TestBaseRepository implements DbAccess {
  private readonly model: any;

  constructor(@unmanaged() model: any) {
    this.model = model;
  }

  public async create<T>(data: any): Promise<T> {
    if (!data.created_at) data.created_at = new Date();
    if (!data.updated_at) data.updated_at = new Date();
    if (!data.id) data.id = Math.random().toString().slice(2, 6);

    this.model.push(data);

    return Promise.resolve(data);
  }

  public async findAll<T = any>(params?: T): Promise<any[]> {
    return Promise.resolve(this.model);
  }

  public async findOne<T = any>(data: T): Promise<T> {
    const result = await this.findMany<T>(data);

    return Promise.resolve(result[0]);
  }

  public async findMany<T = any>(data: T): Promise<T[]> {
    // eslint-disable-next-line array-callback-return
    const result = this.model.filter((obj: T) => {
      let isMatch = false;

      const fields = Object.keys(data);

      for (const key of fields) {
        // @ts-ignore
        isMatch = obj[key] === data[key];
      }

      if (isMatch) {
        return obj;
      }
    });

    return Promise.resolve(result);
  }

  public async findById<T = any>(id: string): Promise<T> {
    // @ts-ignore
    return await this.findOne<T>({ id });
  }

  public async update<T = any>(id: string, data: T): Promise<T> {
    const result = this.model.filter((obj: T) => {
      // @ts-ignore
      if (obj.id === id || obj.resource_id === id) {
        return obj;
      }

      return null;
    });

    if (result[0]) _.remove(this.model, result[0]);

    const updatedUser = { ...result[0], ...data };

    this.model.push(updatedUser);

    return Promise.resolve(updatedUser);
  }

  public async delete<T = any>(id: string): Promise<T> {
    const result = this.model.filter((obj: T) => {
      // @ts-ignore
      if (obj.id === id) {
        return obj;
      }

      return null;
    });

    if (result[0]) _.remove(this.model, result[0]);

    return Promise.resolve(result[0]);
  }
}
