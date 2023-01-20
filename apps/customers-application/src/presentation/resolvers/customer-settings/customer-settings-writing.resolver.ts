import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  CustomerCodeSettingInput,
  CustomersSettingsManagementFacade,
  SettingDto,
} from '~/facade';

@Authorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingDto)
export class CustomerSettingsWritingResolver {
  constructor(
    private readonly customerSettingsManagementFacade: CustomersSettingsManagementFacade,
  ) {}

  @Mutation(() => SettingDto, { name: `updateCustomerCodeSetting` })
  updateCustomerCodeSetting(
    @CurrentUser() user: User,
    @Args('payload')
    payload: CustomerCodeSettingInput,
  ): Observable<SettingDto> {
    return this.customerSettingsManagementFacade.updateSetting(
      user.username,
      payload,
    );
  }
}
