import { Injectable } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { IsNotEmpty, validate } from 'class-validator';

@Injectable()
export class AppConfig {
  @IsNotEmpty()
  public readonly http: {
    port: number;
    url: string;
  };

  @IsNotEmpty()
  public readonly cognito: {
    region: string;
    userPoolId: string;
    clientId: string;
    accessKeyId: string;
    secretAccessKey: string;
  };

  @IsNotEmpty()
  public readonly db: {
    uri: string;
  };

  constructor() {
    this.http = {
      port: Number(process.env.CUSTOMERS_APPLICATION_HTTP_PORT),
      url: process.env.CUSTOMERS_APPLICATION_HTTP_URL,
    };
    this.cognito = {
      clientId: process.env.COGNITO_CLIENT_ID,
      region: process.env.COGNITO_REGION,
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      accessKeyId: process.env.COGNITO_ACCESS_KEY_ID,
      secretAccessKey: process.env.COGNITO_SECRET_ACCESS_KEY,
    };
    this.db = {
      uri: process.env.CUSTOMERS_APPLICATION_DATABASE_URI,
    };
  }
}

@Injectable()
export class AppConfigService {
  constructor(private readonly config: AppConfig) {
    this.validate();
  }

  async validate() {
    return await validate(this.config);
  }

  public get http() {
    return this.config.http;
  }

  public get cognito() {
    return this.config.cognito;
  }

  public get db() {
    return this.config.db;
  }
}

registerAs('app', () => new AppConfigService(new AppConfig()));
