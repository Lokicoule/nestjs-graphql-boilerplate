import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence/persistence.module';
import { CognitoService } from './services/cognito.service';
import { UserService } from './services/user.service';

@Module({
  imports: [PersistenceModule],
  providers: [UserService, CognitoService],
  exports: [UserService, CognitoService],
})
export class BusinessModule {}
