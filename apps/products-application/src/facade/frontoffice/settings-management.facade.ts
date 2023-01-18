import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { SettingsService } from '~/business/services/settings.service';
import { SettingCriteria } from '~/domain/criterias/setting.criteria';
import { Setting } from '~/domain/entities/setting.entity';
import { SettingCriteriaInput } from '../dtos/settings/inputs/setting-criteria.input';
import { SettingInput } from '../dtos/settings/inputs/setting.input';
import { SettingDto } from '../dtos/settings/setting.dto';
import { SettingMapper } from '../mapping/setting.mapper';

@Injectable()
export class SettingsManagementFacade {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly settingMapper: SettingMapper,
  ) {}

  public updateSetting(
    authorId: string,
    input: SettingInput | Setting,
  ): Observable<SettingDto> {
    return this.settingsService
      .updateSetting(this.getSetting(input, authorId))
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }

  public findSetting(
    authorId: string,
    settingCriteria?: SettingCriteriaInput,
  ): Observable<SettingDto> {
    return this.settingsService
      .findSetting(
        new SettingCriteria({
          ...settingCriteria,
          authorId,
        }),
      )
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }

  public findSettingById(
    authorId: string,
    settingId: string,
  ): Observable<SettingDto> {
    return this.settingsService
      .findSetting(
        new SettingCriteria({
          id: settingId,
          authorId,
        }),
      )
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }

  public findSettings(
    authorId: string,
    settingCriteria?: SettingCriteriaInput,
  ): Observable<SettingDto[]> {
    return this.settingsService
      .findSettings(
        new SettingCriteria({
          ...settingCriteria,
          authorId,
        }),
      )
      .pipe(
        map((dto) => {
          console.log('dto', dto);
          return this.settingMapper.toDtoArray(dto);
        }),
      );
  }

  private getSetting(
    setting: SettingInput | Setting,
    authorId: string,
  ): Setting {
    if (setting instanceof Setting) {
      return setting;
    } else {
      return this.settingMapper.toEntity({
        ...setting,
        authorId,
      });
    }
  }
}
