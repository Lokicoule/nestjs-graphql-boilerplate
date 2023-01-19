import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  SettingDto,
  SettingsManagementFacade,
  SettingUpdateInput,
} from '~/facade';

@Authorization({
  requiredGroups: ['User'],
})
@Resolver(() => SettingDto)
export class SettingsWritingResolver {
  constructor(
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @Mutation(() => SettingDto, { name: `updateSetting` })
  update(
    @CurrentUser() user: User,
    @Args('updateSettingInput')
    payload: SettingUpdateInput,
  ): Observable<SettingDto> {
    return this.settingsManagementFacade.updateSetting(user.username, payload);
  }
}
