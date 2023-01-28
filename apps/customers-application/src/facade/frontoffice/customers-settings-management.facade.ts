import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { CustomerSettingsService } from '~/business';
import { UpdateCustomerCodeSettingMutation, SettingOutput } from '../dtos';
import { SettingMapper } from '../mapping';

@Injectable()
export class CustomersSettingsManagementFacade {
  constructor(
    private readonly customerSettingsService: CustomerSettingsService,
    private readonly settingMapper: SettingMapper,
  ) {}

  public updateSetting(
    authorId: string,
    input: UpdateCustomerCodeSettingMutation,
  ): Observable<SettingOutput> {
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
