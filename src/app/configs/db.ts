import knex, { Knex } from 'knex';
import { Env } from './env';

const env = Env.getAll();

const db = require('../../../knexfile')[env.node_env];

export class Db {
  public static getConnection(): Knex {
    return knex(db);
  }
}
