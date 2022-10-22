import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBProviderConfiguration } from './mongodb.provider.config';
import { MongoDBProviderConfigurationService } from './mongodb.provider.config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [MongoDBProviderConfiguration],
        }),
      ],
      useClass: MongoDBProviderConfigurationService,
      inject: [MongoDBProviderConfiguration.KEY],
    }),
  ],
})
export class MongoDBProviderModule {}
