import { CustomExceptionFilter, LoggingInterceptor } from '@lib/fdo-graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductsModule } from './products/products.module';
import { SettingsModule } from './settings/settings.module';
import { UserDto } from './users/facade/dtos/user.dto';
import { UsersModule } from './users/users.module';

const envFilePaths = ['.env.development', '.env.prod'];

const modules = [UsersModule, ProductsModule, SettingsModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFilePaths,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      buildSchemaOptions: {
        orphanedTypes: [UserDto],
      },
    }),
    ...modules,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class ProductsApplicationModule {}
