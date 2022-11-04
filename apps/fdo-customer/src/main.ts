import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FdoCustomerModule } from './fdo-customer.module';

async function bootstrap() {
  const app = await NestFactory.create(FdoCustomerModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('CUSTOMERS_APPLICATION_HTTP_PORT'));
}
bootstrap();
