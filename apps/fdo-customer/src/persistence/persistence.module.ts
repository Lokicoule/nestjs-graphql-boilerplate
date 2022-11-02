import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Customer,
  CustomerSchema,
} from '../domain/entities/customer/customer.entity';
import {
  Setting,
  SettingSchema,
} from '../domain/entities/setting/setting.entity';
import { MongoDBProviderModule } from './providers/mongodb/mongodb.provider.module';
import { CustomerRepository } from './repositories/customer/customer.repository';
import { SettingRepository } from './repositories/setting/setting.repository';

@Module({
  imports: [
    MongoDBProviderModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Setting.name, schema: SettingSchema },
    ]),
  ],
  providers: [CustomerRepository, SettingRepository],
  exports: [CustomerRepository, SettingRepository],
})
export class PersistenceModule {}
