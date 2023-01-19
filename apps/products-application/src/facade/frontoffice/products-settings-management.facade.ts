import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { ProductSettingsService } from '~/business';
import { ProductCodeSettingInput, SettingDto } from '../dtos';
import { SettingMapper } from '../mapping';

@Injectable()
export class ProductsSettingsManagementFacade {
  constructor(
    private readonly productSettingsService: ProductSettingsService,
    private readonly settingMapper: SettingMapper,
  ) {}

  public updateSetting(
    authorId: string,
    input: ProductCodeSettingInput,
  ): Observable<SettingDto> {
    return this.productSettingsService
      .updateCodeGeneratorSetting(
        this.settingMapper.toEntity({
          ...input,
          authorId,
        }),
      )
      .pipe(map((dto) => this.settingMapper.toDto(dto)));
  }
}
