import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { SettingUpdateInput } from '../../../facade/dtos/setting/inputs/setting-update.input';
import { SettingDto } from '../../../facade/dtos/setting/setting.dto';
import { SettingsManagementFacade } from '../../../facade/frontoffice/settings-management.facade';

@Resolver(() => SettingDto)
export class SettingWritingResolver {
  constructor(
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @Mutation(() => SettingDto, { name: `updateSetting` })
  update(
    @Args('updateSettingInput')
    payload: SettingUpdateInput,
  ): Observable<SettingDto> {
    return this.settingsManagementFacade.updateSetting(payload);
  }
}
