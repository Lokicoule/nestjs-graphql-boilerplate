import { NestFactory } from '@nestjs/core';
import { FdoProductModule } from './fdo-product.module';

async function bootstrap() {
  const app = await NestFactory.create(FdoProductModule);
  await app.listen(3000);
}
bootstrap();
