import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { OrderSettingService } from '../../business/services/order-setting.service';
import { SettingService } from '../../business/services/setting.service';
import { SettingCodeEnum } from '../../domain/enums/setting/setting.enum';
import { SettingCriteriaInput } from '../dtos/setting/inputs/setting-criteria.input';
import { SettingInput } from '../dtos/setting/inputs/setting.input';
import { SettingDto } from '../dtos/setting/setting.dto';
import { SettingMapper } from '../mapping/setting/setting.mapper';

@Injectable()
export class SettingsManagementFacade {
  constructor(
    private readonly settingService: SettingService,
    private readonly orderSettingService: OrderSettingService,
  ) {}

  public updateSetting(input: SettingInput): Observable<SettingDto> {
    switch (input.code) {
      case SettingCodeEnum.CODE_GENERATOR:
        return this.orderSettingService
          .updateCodeGeneratorSetting(SettingMapper.mapToEntity(input))
          .pipe(map(SettingMapper.mapToDto));
      default:
        return this.settingService
          .updateSetting(SettingMapper.mapToEntity(input))
          .pipe(map(SettingMapper.mapToDto));
    }
  }

  public findSettingById(SettingId: string): Observable<SettingDto> {
    return this.settingService
      .findSettingById(SettingId)
      .pipe(map(SettingMapper.mapToDto));
  }

  public findSettings(
    settingCriteria?: SettingCriteriaInput,
  ): Observable<SettingDto[]> {
    return this.settingService
      .findSettings(SettingMapper.mapCriteriaInputToCriteria(settingCriteria))
      .pipe(map(SettingMapper.mapListToDtoList));
  }
}
