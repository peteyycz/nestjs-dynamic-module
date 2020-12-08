import IORedis from 'ioredis';

import { DynamicModule, Module, ModuleMetadata, Type } from '@nestjs/common';

import { CONFIG_TOKEN } from './redis.constants';
import { RedisService } from './redis.service';

export interface RedisAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<IORedis.RedisOptions>;
  useClass?: Type<IORedis.RedisOptions>;
  inject?: any[];
  global?: boolean;
  useFactory?: (
    ...args: any[]
  ) => Promise<IORedis.RedisOptions> | IORedis.RedisOptions;
}

@Module({})
export class RedisModule {
  static forRootAsync(options: RedisAsyncOptions): DynamicModule {
    return {
      global: options.global,
      module: RedisModule,
      providers: [
        {
          provide: CONFIG_TOKEN,
          inject: options.inject,
          useFactory: options.useFactory,
          useClass: options.useClass,
          useExisting: options.useExisting,
        },
        RedisService,
      ],
      exports: [RedisService],
      imports: options.imports,
    };
  }
}
