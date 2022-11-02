import { Module } from '@nestjs/common';
import { FacadeModule } from '../facade/facade.module';
import { ApolloProviderModule } from './providers/apollo/apollo.provider.module';
import { CustomerDeletingResolver } from './resolvers/customer/customer-deleting.resolver';
import { CustomerReadingResolver } from './resolvers/customer/customer-reading.resolver';
import { CustomerWritingResolver } from './resolvers/customer/customer-writing.resolver';
import { SettingReadingResolver } from './resolvers/setting/setting-reading.resolver';
import { SettingWritingResolver } from './resolvers/setting/setting-writing.resolver';

@Module({
  imports: [ApolloProviderModule, FacadeModule],
  providers: [
    CustomerReadingResolver,
    CustomerWritingResolver,
    CustomerDeletingResolver,
    SettingReadingResolver,
    SettingWritingResolver,
  ],
})
export class PresentationModule {}
