import { Module } from '@nestjs/common';
import { UsersBusinessModule } from '../business/users-business.module';
import { UsersManagementFacade } from './frontoffice/users-management.facade';

@Module({
  imports: [UsersBusinessModule],
  providers: [UsersManagementFacade],
  exports: [UsersManagementFacade],
})
export class UsersFacadeModule {}
