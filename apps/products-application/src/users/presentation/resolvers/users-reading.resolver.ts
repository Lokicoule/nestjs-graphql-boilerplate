import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { ProductDto } from '../../../products/facade/dtos/product.dto';
import { ProductsManagementFacade } from '../../../products/facade/frontoffice/products-management.facade';
import { SettingsManagementFacade } from '../../../settings/facade/frontoffice/settings-management.facade';
import { UserDto } from '../../facade/dtos/user.dto';
import { SettingDto } from '../../../settings/facade/dtos/setting.dto';

@Resolver((of) => UserDto)
export class UsersReadingResolver {
  constructor(
    private readonly productsManagementFacade: ProductsManagementFacade,
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @ResolveField((of) => [ProductDto])
  public products(@Parent() user: UserDto): Observable<ProductDto[]> {
    return this.productsManagementFacade.findProducts(user.id);
  }

  @ResolveField((of) => [SettingDto])
  public settings(@Parent() user: UserDto): Observable<SettingDto[]> {
    return this.settingsManagementFacade.findSettings(user.id);
  }
}
