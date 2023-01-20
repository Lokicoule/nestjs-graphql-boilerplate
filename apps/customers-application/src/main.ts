import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './data/config/app.config';
import { CustomersApplicationModule } from './customers-application.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomersApplicationModule);
  const configService = app.get(AppConfigService);

  await app.listen(configService.http.port);
  console.log(`Customers application is running on: ${await app.getUrl()}`);
}
bootstrap();
