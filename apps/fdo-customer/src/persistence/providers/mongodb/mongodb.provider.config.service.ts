import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { MongoDBProviderConfiguration } from './mongodb.provider.config';

@Injectable()
export class MongoDBProviderConfigurationService
  implements MongooseOptionsFactory
{
  constructor(
    @Inject(MongoDBProviderConfiguration.KEY)
    private _config: ConfigType<typeof MongoDBProviderConfiguration>,
  ) {}

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return {
      uri: this._config.uri,
    };
  }
}
