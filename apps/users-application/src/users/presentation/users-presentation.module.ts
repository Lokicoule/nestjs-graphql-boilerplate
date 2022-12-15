import { CustomExceptionFilter, LoggingInterceptor } from '@lib/fdo-graphql';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ApolloProviderModule } from '../../apollo/apollo.provider.module';
import { CognitoProviderModule } from '../../cognito/cognito.provider.module';
import { UsersFacadeModule } from '../facade/users-facade.module';
import { UserReadingResolver } from './resolvers/users-reading.resolver';
import { UserWritingResolver } from './resolvers/users-writing.resolver';

const userResolvers = [UserReadingResolver, UserWritingResolver];

@Module({
  imports: [ApolloProviderModule, CognitoProviderModule, UsersFacadeModule],
  providers: [
    ...userResolvers,
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
export class UsersPresentationModule {}
