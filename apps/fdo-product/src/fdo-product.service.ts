import { Injectable } from '@nestjs/common';

@Injectable()
export class FdoProductService {
  getHello(): string {
    return 'Hello World!';
  }
}
