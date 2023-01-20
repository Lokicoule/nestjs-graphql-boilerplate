import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService, DataModule } from '~/data';

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
