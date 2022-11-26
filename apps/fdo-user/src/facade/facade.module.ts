import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { UsersManagementFacade } from './frontoffice/users-management.facade';

@Module({
  imports: [BusinessModule],
  providers: [UsersManagementFacade],
  exports: [UsersManagementFacade],
})
export class FacadeModule {}
