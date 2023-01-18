import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from '~/data/config/app.config';
import { DataModule } from '~/data/data.module';
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
