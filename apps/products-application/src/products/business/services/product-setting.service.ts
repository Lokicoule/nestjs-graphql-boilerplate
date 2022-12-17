import { duplicateRetryStrategy } from '@lib/fdo-database/mongodb/retry/duplicate-retry.strategy';
import { Injectable } from '@nestjs/common';
import { SettingsService } from '../../../settings/business/services/settings.service';
import { defer, map, Observable, of, retry, switchMap } from 'rxjs';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductSettingService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly settingsService: SettingsService,
  ) {}

  public generateProduct(product: Product): Observable<Product> {
    return defer(() =>
      this.settingsService.findSetting({
        code: SettingCodeEnum.CODE_GENERATOR,
        authorId: product.authorId,
      }),
    ).pipe(
      map((setting) =>
        this.settingsService.createOrUpdateSetting(
          new SettingCriteria.Builder()
            .withCode(SettingCodeEnum.CODE_GENERATOR)
            .buildCriteria(),
          ProductUseCase.incrementCounter(
            setting || ProductUseCase.initializeCodeGeneratorSetting(),
          ),
        ),
      ),
      switchMap((setting$) =>
        setting$.pipe(map((setting) => ProductUseCase.generateCode(setting))),
      ),
      switchMap((code: string) =>
        of(new Product.Builder().copy(product).setCode(code).build()),
      ),
      switchMap((product) => this.productsRepository.create(product)),
      retry({ count: 10, delay: duplicateRetryStrategy }),
    );
  }
}
