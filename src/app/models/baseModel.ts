import { Model } from 'objection';
import { Db } from '../configs/db';

Model.knex(Db.getConnection());

export class BaseModel extends Model {
  static get idColumn() {
    return 'id';
  }

  static get modelPaths() {
    return [__dirname];
  }
}
