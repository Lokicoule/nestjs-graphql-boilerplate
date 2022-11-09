import { Args, Query, Resolver } from '@nestjs/graphql';
import { SettingCriteriaInput } from '../../../facade/dtos/setting/inputs/setting-criteria.input';
import { SettingsManagementFacade } from '../../../facade/frontoffice/settings-management.facade';
import { Observable } from 'rxjs';
import { SettingDto } from '../../../facade/dtos/setting/setting.dto';

@Resolver(() => SettingDto)
export class SettingReadingResolver {
  constructor(
    private readonly settingsManagementFacade: SettingsManagementFacade,
  ) {}

  @Query(() => [SettingDto], {
    name: `getSettings`,
    nullable: true,
  })
  findByCriteria(
    @Args('criterions', { nullable: true })
    criterions?: SettingCriteriaInput,
  ): Observable<SettingDto[]> {
    return this.settingsManagementFacade.findSettings(criterions);
  }

  @Query(() => SettingDto, {
    name: `getSetting`,
    nullable: true,
  })
  findById(
    @Args('id', { type: () => String }) id: string,
  ): Observable<SettingDto> {
    return this.settingsManagementFacade.findSettingById(id);
  }
}
