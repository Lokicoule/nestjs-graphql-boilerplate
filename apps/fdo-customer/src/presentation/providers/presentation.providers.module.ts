import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloProviderModule } from './apollo/apollo.provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.prod'],
    }),
    ApolloProviderModule,
  ],
  exports: [ApolloProviderModule],
})
export class PresentationProvidersModule {}
