import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { CustomerSettingsService } from '~/business';
import { CustomerCodeSettingInput, SettingDto } from '../dtos';
import { SettingMapper } from '../mapping';

@Injectable()
export class CustomersSettingsManagementFacade {
  constructor(
    private readonly customerSettingsService: CustomerSettingsService,
    private readonly settingMapper: SettingMapper,
  ) {}

  public updateSetting(
    authorId: string,
    input: CustomerCodeSettingInput,
  ): Observable<SettingDto> {
    return this.customerSettingsService
      .updateCodeGeneratorSetting(
        this.settingMapper.toEntity({
          ...input,
          authorId,
        }),
      )
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }
}
