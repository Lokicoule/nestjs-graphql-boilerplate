import { Module } from '@nestjs/common';
import { CustomersManagementFacade } from './frontoffice/customers-management.facade';

@Module({
  providers: [CustomersManagementFacade],
  exports: [CustomersManagementFacade],
})
export class FacadeModule {}
