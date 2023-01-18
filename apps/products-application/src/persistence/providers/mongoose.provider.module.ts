import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '~/data/config/app.config';
import { DataModule } from '~/data/data.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [DataModule],
      useFactory: async (configService: AppConfigService) => ({
        uri: configService.db.uri,
      }),
      inject: [AppConfigService],
    }),
  ],
})
export class MongooseProviderModule {}
