import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainModule } from '~/domain';
import {
  Customer,
  CustomerSchema,
  Setting,
  SettingSchema,
} from '~/domain/entities';
import { MongooseProviderModule } from './providers/mongoose.provider.module';
import { CustomersRepository, SettingsRepository } from './repositories';

@Module({
  imports: [
    DomainModule,
    MongooseProviderModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Setting.name, schema: SettingSchema },
    ]),
  ],
  providers: [SettingsRepository, CustomersRepository],
  exports: [SettingsRepository, CustomersRepository],
})
export class PersistenceModule {}
