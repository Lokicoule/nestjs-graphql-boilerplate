import { Module } from '@nestjs/common';

import { CognitoProviderModule } from '../../cognito/cognito.provider.module';
import { ProductsFacadeModule } from '../../products/facade/products-facade.module';
import { SettingsFacadeModule } from '../../settings/facade/settings-facade.module';
import { UsersReadingResolver } from './resolvers/users-reading.resolver';

const usersResolvers = [UsersReadingResolver];

@Module({
  imports: [CognitoProviderModule, ProductsFacadeModule, SettingsFacadeModule],
  providers: [...usersResolvers],
})
export class UsersPresentationModule {}
