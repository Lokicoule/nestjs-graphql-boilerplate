import { Module } from '@nestjs/common';
import { FacadeModule } from '../facade/facade.module';
import { PresentationProvidersModule } from './providers/presentation.providers.module';
import { CustomerDeletingResolver } from './resolvers/customer/customer-deleting.resolver';
import { CustomerReadingResolver } from './resolvers/customer/customer-reading.resolver';
import { CustomerWritingResolver } from './resolvers/customer/customer-writing.resolver';

@Module({
  imports: [PresentationProvidersModule, FacadeModule],
  providers: [
    CustomerReadingResolver,
    CustomerWritingResolver,
    CustomerDeletingResolver,
  ],
})
export class PresentationModule {}
