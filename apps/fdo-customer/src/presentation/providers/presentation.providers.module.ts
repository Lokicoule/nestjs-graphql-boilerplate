import { Module } from '@nestjs/common';
import { ApolloProviderModule } from './apollo/apollo.provider.module';

@Module({
  imports: [ApolloProviderModule],
  exports: [ApolloProviderModule],
})
export class PresentationProvidersModule {}
