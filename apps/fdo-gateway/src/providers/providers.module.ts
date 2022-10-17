import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApolloGraphQLProviderModule } from './graphql/apollo/apollo.provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.prod'],
    }),
    ApolloGraphQLProviderModule,
  ],
})
export class ProvidersModule {}
