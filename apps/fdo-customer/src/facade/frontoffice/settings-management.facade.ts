import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SettingService } from '../../business/services/setting.service';
import { SettingCriteriaInput } from '../dtos/setting/inputs/setting-criteria.input';
import { SettingUpdateInput } from '../dtos/setting/inputs/setting-update.input';
import { SettingDto } from '../dtos/setting/setting.dto';
import { SettingMapper } from '../mapping/setting/setting.mapper';

@Injectable()
export class SettingsManagementFacade {
  constructor(private readonly _settingService: SettingService) {}

  public updateSetting(input: SettingUpdateInput): Observable<SettingDto> {
    return this._settingService
      .updateSetting(SettingMapper.mapToEntity(input))
      .pipe(map(SettingMapper.mapToDto));
  }

  public findSettingById(SettingId: string): Observable<SettingDto> {
    return this._settingService
      .findSettingById(SettingId)
      .pipe(map(SettingMapper.mapToDto));
  }

  public findSettings(
    settingCriteria?: SettingCriteriaInput,
  ): Observable<SettingDto[]> {
    return this._settingService
      .findSettings(SettingMapper.mapCriteriaInputToCriteria(settingCriteria))
      .pipe(map(SettingMapper.mapListToDtoList));
  }
}
