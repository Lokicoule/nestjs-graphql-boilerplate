import { NestFactory } from '@nestjs/core';
import { FdoOrderModule } from './fdo-order.module';

async function bootstrap() {
  const app = await NestFactory.create(FdoOrderModule);
  await app.listen(3000);
}
bootstrap();
