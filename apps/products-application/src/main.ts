import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ProductsApplicationModule } from './products-application.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsApplicationModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.get('PRODUCTS_APPLICATION_HTTP_PORT'));
  console.log(`Products application is running on: ${await app.getUrl()}`);
}
bootstrap();
