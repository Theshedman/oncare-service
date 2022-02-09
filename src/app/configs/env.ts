import { config } from 'dotenv';

config();

export interface IEnv {
  node_env: string;
  port: number;
  db_host: string;
  db_port: string;
  db_name: string;
  db_user: string;
  db_password: string;
  jwt_secret: string;
  redis_port: number;
  redis_host: string;
  redis_password: string;
  redis_username: string;
}

const env: IEnv = {
  db_name: process.env.DB_NAME as string,
  db_password: process.env.DB_PASSWORD as string,
  db_port: process.env.DB_PORT as string,
  db_user: process.env.DB_USER as string,
  jwt_secret: process.env.JWT_SECRET as string,
  node_env: process.env.NODE_ENV as string,
  port: Number(process.env.PORT),
  db_host: process.env.DB_HOST as string,
  redis_username: process.env.REDIS_USERNAME as string,
  redis_password: process.env.REDIS_PASSWORD as string,
  redis_port: Number(process.env.REDIS_PORT),
  redis_host: process.env.REDIS_HOST as string,
}

export class Env {
  public static getAll() {
    return env;
  }
}
