import { Module } from '@nestjs/common';
import { CognitoService } from './services/cognito.service';

@Module({
  providers: [CognitoService],
  exports: [CognitoService],
})
export class CognitoBusinessModule {}
