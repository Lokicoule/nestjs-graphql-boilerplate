import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { Module } from '@nestjs/common';
import { AppConfigService, DataModule } from '~/data';

@Module({
  imports: [
    CognitoAuthModule.registerAsync({
      imports: [DataModule],
      useFactory: (appConfigService: AppConfigService) => ({
        jwtVerifier: {
          userPoolId: appConfigService.cognito.userPoolId,
          clientId: appConfigService.cognito.clientId,
          tokenUse: 'id',
        },
      }),
      inject: [AppConfigService],
    }),
  ],
})
export class AuthProviderModule {}
