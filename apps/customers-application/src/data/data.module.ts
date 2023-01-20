import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService, AppConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.prod'],
      isGlobal: true,
    }),
  ],
  providers: [AppConfigService, AppConfig],
  exports: [AppConfigService, AppConfig],
})
export class DataModule {}
