import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CognitoAuthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        region: configService.get('COGNITO_REGION'),
        credentials: {
          accessKeyId: configService.get('COGNITO_ACCESS_KEY_ID'),
          secretAccessKey: configService.get('COGNITO_SECRET_ACCESS_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthProviderModule {}
