import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { OrderSettingService } from './services/order-setting.service';
import { OrderService } from './services/order.service';
import { SettingService } from './services/setting.service';

@Module({
  imports: [PersistenceModule],
  providers: [OrderService, SettingService, OrderSettingService],
  exports: [OrderService, SettingService, OrderSettingService],
})
export class BusinessModule {}
