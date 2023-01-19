import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { Module } from '@nestjs/common';
import { AppConfigService, DataModule } from '~/data';

@Module({
  imports: [
    CognitoAuthModule.registerAsync({
      imports: [DataModule],
      useFactory: (appConfigService: AppConfigService) => ({
        region: appConfigService.cognito.region,
        credentials: {
          accessKeyId: appConfigService.cognito.accessKeyId,
          secretAccessKey: appConfigService.cognito.secretAccessKey,
        },
      }),
      inject: [AppConfigService],
    }),
  ],
})
export class AuthProviderModule {}
