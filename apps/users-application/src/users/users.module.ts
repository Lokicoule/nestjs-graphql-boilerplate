/* import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
  ],
})
export class UsersModule {}
 */

import { Module } from '@nestjs/common';
import { UsersPresentationModule } from './presentation/users-presentation.module';

@Module({
  imports: [UsersPresentationModule],
  exports: [UsersPresentationModule],
})
export class UsersModule {}
