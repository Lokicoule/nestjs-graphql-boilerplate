import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseProviderModule } from '../../mongoose/mongodb.provider.module';
import { Setting, SettingSchema } from '../domain/entities/setting.entity';
import { SettingsRepository } from './repositories/settings.repository';

@Module({
  imports: [
    MongooseProviderModule,
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
  ],
  providers: [SettingsRepository],
  exports: [SettingsRepository],
})
export class SettingsPersistenceModule {}
