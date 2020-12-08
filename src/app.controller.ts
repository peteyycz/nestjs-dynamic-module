import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  async getHello(@Query('key') key: string): Promise<string> {
    const param = await this.redisService.get(key);
    return this.appService.getHello(param);
  }
}
