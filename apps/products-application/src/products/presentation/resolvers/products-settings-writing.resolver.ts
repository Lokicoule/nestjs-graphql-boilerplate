import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { SettingDto } from '../../../settings/facade/dtos/setting.dto';
import { ProductCodeSettingInput } from '../../facade/dtos/inputs/product-code-setting.input';
import { ProductsSettingsManagementFacade } from '../../facade/frontoffice/products-settings-management.facade';

@Authorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingDto)
export class ProductsSettingsWritingResolver {
  constructor(
    private readonly productSettingsManagementFacade: ProductsSettingsManagementFacade,
  ) {}

  @Mutation(() => SettingDto, { name: `updateProductCodeSetting` })
  updateProductCodeSetting(
    @CurrentUser() user: User,
    @Args('payload')
    payload: ProductCodeSettingInput,
  ): Observable<SettingDto> {
    return this.productSettingsManagementFacade.updateSetting(
      user.username,
      payload,
    );
  }
}
