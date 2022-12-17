import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SettingsService } from '../../business/services/settings.service';
import { SettingCodeEnum } from '../../domain/enums/setting.enum';
import { SettingCriteriaInput } from '../dtos/inputs/setting-criteria.input';
import { SettingInput } from '../dtos/inputs/setting.input';
import { SettingDto } from '../dtos/setting.dto';
import { SettingMapper } from '../mapping/setting.mapper';

@Injectable()
export class SettingsManagementFacade {
  constructor(private readonly settingsService: SettingsService) {}

  public updateSetting(
    authorId: string,
    input: SettingInput,
  ): Observable<SettingDto> {
    switch (input.code) {
      case SettingCodeEnum.CODE_GENERATOR:
        return this.settingsService
          .updateCodeGeneratorSetting(
            SettingMapper.toEntity({
              authorId,
              ...input,
            }),
          )
          .pipe(map(SettingMapper.toDto));
      default:
        return this.settingsService
          .updateSetting(SettingMapper.toEntity({ authorId, ...input }))
          .pipe(map(SettingMapper.toDto));
    }
  }

  public findSettingByIdAndAuthorId(
    authorId: string,
    settingId: string,
  ): Observable<SettingDto> {
    return this.settingsService
      .findSetting({
        _id: settingId,
        authorId,
      })
      .pipe(map(SettingMapper.toDto));
  }

  public findSettingsByAuthorId(
    authorId: string,
    settingCriteria?: SettingCriteriaInput,
  ): Observable<SettingDto[]> {
    return this.settingsService
      .findSettings({ authorId, ...settingCriteria })
      .pipe(map(SettingMapper.toDtoArray));
  }
}
