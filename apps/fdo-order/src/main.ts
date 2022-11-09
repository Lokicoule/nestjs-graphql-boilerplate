import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FdoOrderModule } from './fdo-order.module';

async function bootstrap() {
  const app = await NestFactory.create(FdoOrderModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('ORDERS_APPLICATION_HTTP_PORT'));
}
bootstrap();
