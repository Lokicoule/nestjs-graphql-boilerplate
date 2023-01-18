import { User } from '@nestjs-cognito/auth';
import { Authorization, CurrentUser } from '@nestjs-cognito/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { SettingUpdateInput } from '~/facade/dtos/settings/inputs/setting-update.input';
import { SettingDto } from '~/facade/dtos/settings/setting.dto';
import { SettingsManagementFacade } from '~/facade/frontoffice/settings-management.facade';

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
