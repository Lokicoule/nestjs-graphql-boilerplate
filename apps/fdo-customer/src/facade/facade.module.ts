import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { CustomersManagementFacade } from './frontoffice/customers-management.facade';

@Module({
  imports: [BusinessModule],
  providers: [CustomersManagementFacade],
  exports: [CustomersManagementFacade],
})
export class FacadeModule {}
