import { Module } from '@nestjs/common';

import { CognitoBusinessModule } from '../../cognito/business/cognito-business.module';
import { UsersPersistenceModule } from '../persistence/users-persistence.module';
import { UsersService } from './services/users.service';

@Module({
  imports: [UsersPersistenceModule, CognitoBusinessModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersBusinessModule {}
