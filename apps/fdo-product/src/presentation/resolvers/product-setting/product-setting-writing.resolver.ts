import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SettingCodeGeneratorInput } from '../../../facade/dtos/setting/inputs/use-cases/code-generator.input';
import { Observable } from 'rxjs';
import { SettingDto } from '../../../facade/dtos/setting/setting.dto';
import { SettingsManagementFacade } from '../../../facade/frontoffice/settings-management.facade';

@Resolver(() => SettingDto)
export class ProductSettingWritingResolver {
  constructor(
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @Mutation(() => SettingDto, { name: `updateCodeGeneratorSetting` })
  updateCodeGeneratorSetting(
    @Args('updateSettingCodeGeneratorInput')
    payload: SettingCodeGeneratorInput,
  ): Observable<SettingDto> {
    return this.settingsManagementFacade.updateSetting(payload);
  }
}
