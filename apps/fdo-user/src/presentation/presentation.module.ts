import { CustomExceptionFilter, LoggingInterceptor } from '@lib/fdo-graphql';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FacadeModule } from '../facade/facade.module';
import { ApolloProviderModule } from './providers/apollo/apollo.provider.module';
import { UserWritingResolver } from './resolvers/user/user-writing.resolver';
import { UserReadingResolver } from './resolvers/user/user-reading.resolver';

const userResolvers = [UserReadingResolver, UserWritingResolver];

@Module({
  imports: [ApolloProviderModule, FacadeModule],
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
