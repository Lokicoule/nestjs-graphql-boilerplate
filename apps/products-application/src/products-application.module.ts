import { GlobalExceptionFilter, LoggingInterceptor } from '@lib/fdo-graphql';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { PresentationModule } from '~/presentation/presentation.module';

const envFilePaths = ['.env.development', '.env.prod'];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePaths,
    }),
    PresentationModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class ProductsApplicationModule {}
