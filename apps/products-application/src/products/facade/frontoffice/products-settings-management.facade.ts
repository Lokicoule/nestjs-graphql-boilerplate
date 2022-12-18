import { User } from '@nestjs-cognito/auth';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { SettingDto } from '../../../settings/facade/dtos/setting.dto';
import { SettingMapper } from '../../../settings/facade/mapping/setting.mapper';
import { ProductsSettingsService } from '../../business/services/products-settings.service';
import { ProductCodeSettingInput } from '../dtos/inputs/product-code-setting.input';

@Injectable()
export class ProductsSettingsManagementFacade {
  constructor(
    private readonly productsSettingsService: ProductsSettingsService,
  ) {}

  public updateSetting(
    cognitoUser: User,
    input: ProductCodeSettingInput,
  ): Observable<SettingDto> {
    return this.productsSettingsService
      .updateCodeGeneratorSetting(
        SettingMapper.toEntity({
          ...input,
          authorId: cognitoUser.username,
        }),
      )
      .pipe(map(SettingMapper.toDto));
  }
}
