import { injectable } from 'inversify';
import Redis from 'ioredis';
import { Env, IEnv } from '../../configs/env';
import { logger } from '../../utils';

@injectable()
export class RedisService {
  private redisClient: any;
  private env: IEnv;
  private readonly redisConnectionString: string;

  constructor() {
    this.env = Env.getAll();
    this.redisConnectionString = `rediss://${this.env.redis_username}:${this.env.redis_password}@${this.env.redis_host}:${this.env.redis_port}?allowUsernameInURI=true`;

    this.redisClient = new Redis(this.redisConnectionString);

    console.log('RedisClient:', this.redisClient);
  }

  public async set(key: string, value: any, expiresAt: number): Promise<void> {
    logger.info('Running RedisService.set');

    return new Promise((resolve, reject) => {
      this.redisClient.set(key, JSON.stringify(value), 'ex', expiresAt, (err: Error, reply: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  public async get(key: string): Promise<string> {
    logger.info('Running RedisService.get');

    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (err: Error, reply: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  public async del(key: string): Promise<void> {
    logger.info('Running RedisService.del');

    return new Promise((resolve, reject) => {
      this.redisClient.del(key, (err: Error, reply: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}
