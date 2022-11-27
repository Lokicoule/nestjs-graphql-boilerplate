import { CustomExceptionFilter, LoggingInterceptor } from '@lib/fdo-graphql';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FacadeModule } from '../facade/facade.module';
import { ApolloProviderModule } from './providers/apollo/apollo.provider.module';
import { CognitoProviderModule } from './providers/cognito/cognito.provider.module';
import { UserReadingResolver } from './resolvers/user/user-reading.resolver';
import { UserWritingResolver } from './resolvers/user/user-writing.resolver';

const userResolvers = [UserReadingResolver, UserWritingResolver];

@Module({
  imports: [ApolloProviderModule, CognitoProviderModule, FacadeModule],
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
export class PresentationModule {}
