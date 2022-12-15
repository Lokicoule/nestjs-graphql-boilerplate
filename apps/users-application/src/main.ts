import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { UsersApplicationModule } from './users-application.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersApplicationModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('USERS_APPLICATION_HTTP_PORT'));
}
bootstrap();
