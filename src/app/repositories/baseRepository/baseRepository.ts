import { injectable, unmanaged } from 'inversify';
import { Model, ModelClass } from 'objection';
import { logger } from '../../utils';
import { DbAccess } from './base.interface';

@injectable()
export class BaseRepository implements DbAccess {
  private readonly model: ModelClass<Model>;

  constructor(@unmanaged() model: ModelClass<Model>) {
    this.model = model;
  }

  async create<T>(data: T): Promise<any> {
    logger.info('Running BaseRepository.create');

    return this.model.query().insertAndFetch(data);
  }

  async findAll(): Promise<any> {
    logger.info('Running BaseRepository.findAll');

    return this.model.query();
  }

  async findOne<T>(data: T): Promise<any> {
    logger.info('Running BaseRepository.findOne');

    return this.model.query().where(data).first();
  }

  async findById(id: string): Promise<any> {
    logger.info('Running BaseRepository.findById');

    return this.model.query().findById(id);
  }

  async update<T>(id: string, data: T): Promise<any> {
    logger.info('Running BaseRepository.update');

    return this.model.query().patchAndFetchById(id, data);
  }

  async delete(id: string): Promise<any> {
    logger.info('Running BaseRepository.delete');

    return this.model.query().deleteById(id);
  }
}
