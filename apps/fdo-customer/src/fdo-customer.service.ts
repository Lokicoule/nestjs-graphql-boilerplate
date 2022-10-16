import { Injectable } from '@nestjs/common';

@Injectable()
export class FdoCustomerService {
  getHello(): string {
    return 'Hello World!';
  }
}
