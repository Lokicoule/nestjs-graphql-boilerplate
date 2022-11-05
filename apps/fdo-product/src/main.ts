import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FdoProductModule } from './fdo-product.module';

async function bootstrap() {
  const app = await NestFactory.create(FdoProductModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PRODUCTS_APPLICATION_HTTP_PORT'));
}
bootstrap();
