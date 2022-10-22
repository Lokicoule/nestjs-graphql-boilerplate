import { Module } from '@nestjs/common';
import { MongoDBProviderModule } from './mongodb/mongodb.provider.module';

@Module({
  imports: [MongoDBProviderModule],
})
export class PersistenceProvidersModule {}
