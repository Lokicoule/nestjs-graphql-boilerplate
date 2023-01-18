import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './data/config/app.config';
import { ProductsApplicationModule } from './products-application.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsApplicationModule);
  const configService = app.get(AppConfigService);

  await app.listen(configService.http.port);
  console.log(`Products application is running on: ${await app.getUrl()}`);
}
bootstrap();
