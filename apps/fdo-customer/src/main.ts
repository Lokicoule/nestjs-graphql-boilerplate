import { NestFactory } from '@nestjs/core';
import { FdoCustomerModule } from './fdo-customer.module';

async function bootstrap() {
  const app = await NestFactory.create(FdoCustomerModule);
  await app.listen(3000);
}
bootstrap();
