import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../domain/entities/order/order.entity';
import {
  Setting,
  SettingSchema,
} from '../domain/entities/setting/setting.entity';
import { MongoDBProviderModule } from './providers/mongodb/mongodb.provider.module';
import { OrderRepository } from './repositories/order/order.repository';
import { SettingRepository } from './repositories/setting/setting.repository';

@Module({
  imports: [
    MongoDBProviderModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Setting.name, schema: SettingSchema },
    ]),
  ],
  providers: [OrderRepository, SettingRepository],
  exports: [OrderRepository, SettingRepository],
})
export class PersistenceModule {}
