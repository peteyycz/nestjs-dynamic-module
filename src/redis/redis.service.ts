import IORedis from 'ioredis';

import { Inject, Injectable } from '@nestjs/common';

import { CONFIG_TOKEN } from './redis.constants';

@Injectable()
export class RedisService {
  private readonly redisClient: IORedis.Redis;

  constructor(@Inject(CONFIG_TOKEN) options: IORedis.RedisOptions) {
    this.redisClient = new IORedis({
      host: options.host,
      port: options.port,
    });
  }

  get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  set(key: string, value: string): Promise<string> {
    return this.redisClient.set(key, value);
  }
}
