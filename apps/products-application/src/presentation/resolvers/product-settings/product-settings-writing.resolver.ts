import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  UpdateProductCodeSettingMutation,
  ProductsSettingsManagementFacade,
  SettingOutput,
} from '~/facade';

@Authorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingOutput)
export class ProductSettingsWritingResolver {
  constructor(
    private readonly productSettingsManagementFacade: ProductsSettingsManagementFacade,
  ) {}

  @Mutation(() => SettingOutput, { name: `updateProductCodeSetting` })
  updateProductCodeSetting(
    @CurrentUser() user: User,
    @Args('payload')
    payload: UpdateProductCodeSettingMutation,
  ): Observable<SettingOutput> {
    return this.productSettingsManagementFacade.updateSetting(
      user.username,
      payload,
    );
  }
}
