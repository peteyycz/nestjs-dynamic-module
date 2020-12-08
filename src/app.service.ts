import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(param: string): string {
    return `Hello ${param} World!`;
  }
}
