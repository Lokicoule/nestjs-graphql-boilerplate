import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  UpdateCustomerCodeSettingMutation,
  CustomersSettingsManagementFacade,
  SettingOutput,
} from '~/facade';

@Authorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingOutput)
export class CustomerSettingsWritingResolver {
  constructor(
    private readonly customerSettingsManagementFacade: CustomersSettingsManagementFacade,
  ) {}

  @Mutation(() => SettingOutput, { name: `updateCustomerCodeSetting` })
  updateCustomerCodeSetting(
    @CurrentUser() user: User,
    @Args('payload')
    payload: UpdateCustomerCodeSettingMutation,
  ): Observable<SettingOutput> {
    return this.customerSettingsManagementFacade.updateSetting(
      user.username,
      payload,
    );
  }
}
