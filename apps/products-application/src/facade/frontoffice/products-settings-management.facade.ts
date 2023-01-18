import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { ProductSettingsService } from '~/business/services/product-settings.service';
import { ProductCodeSettingInput } from '../dtos/product-settings/inputs/product-code-setting.input';
import { SettingDto } from '../dtos/settings/setting.dto';
import { SettingMapper } from '../mapping/setting.mapper';

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
