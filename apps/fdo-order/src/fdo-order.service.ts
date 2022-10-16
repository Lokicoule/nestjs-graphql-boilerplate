import { Injectable } from '@nestjs/common';

@Injectable()
export class FdoOrderService {
  getHello(): string {
    return 'Hello World!';
  }
}
