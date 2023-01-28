import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { ProductSettingsService } from '~/business';
import { UpdateProductCodeSettingMutation, SettingOutput } from '../dtos';
import { SettingMapper } from '../mapping';

@Injectable()
export class ProductsSettingsManagementFacade {
  constructor(
    private readonly productSettingsService: ProductSettingsService,
    private readonly settingMapper: SettingMapper,
  ) {}

  public updateSetting(
    authorId: string,
    input: UpdateProductCodeSettingMutation,
  ): Observable<SettingOutput> {
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
