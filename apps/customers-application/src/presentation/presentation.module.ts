import { Module } from '@nestjs/common';

import { FacadeModule } from '~/facade';
import { AuthProviderModule } from './providers/auth.provider.module';
import { GraphQLProviderModule } from './providers/graphql.provider.module';
import { resolvers } from './resolvers';

@Module({
  imports: [GraphQLProviderModule, AuthProviderModule, FacadeModule],
  providers: resolvers,
})
export class PresentationModule {}
