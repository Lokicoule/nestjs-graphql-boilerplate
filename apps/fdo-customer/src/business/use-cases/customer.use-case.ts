import { UseCaseException } from '@lib/fdo-domain';
import { StringNumberUtils } from '@lib/fdo-utils';
import { Property } from '../../domain/entities/property/property.entity';
import { Setting } from '../../domain/entities/setting/setting.entity';
import { PropertyKeyEnum } from '../../domain/enums/property/property.enum';

export class CustomerUseCase {
  public static validateEmail(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  public static validatePhone(phone: string): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  public static generateCode(setting: Setting): string {
    if (!Boolean(setting)) {
      throw new UseCaseException('The setting is required');
    }

    if (!Boolean(setting)) {
      throw new UseCaseException('The setting is required');
    }
    if (!Boolean(setting.properties)) {
      throw new UseCaseException('The setting properties are required');
    }

    const counterProperty = setting.properties.find(
      (param) => param.key === PropertyKeyEnum.COUNTER,
    );
    if (!Boolean(counterProperty)) {
      throw new UseCaseException('The counter property is required');
    }

    const prefixProperty = setting.properties.find(
      (param) => param.key === PropertyKeyEnum.PREFIX,
    );
    const suffixProperty = setting.properties.find(
      (param) => param.key === PropertyKeyEnum.SUFFIX,
    );

    const code = `${prefixProperty?.value || ''}${counterProperty.value}${
      suffixProperty?.value || ''
    }`;

    if (!Boolean(code)) {
      throw new UseCaseException('The generated code is null or empty');
    }
    return code;
  }

  public static incrementCounter(setting: Setting): Setting {
    if (!Boolean(setting)) {
      throw new UseCaseException('The setting is required');
    }
    if (!Boolean(setting.properties)) {
      throw new UseCaseException('The setting properties are required');
    }

    return new Setting.Builder()
      .setId(setting._id)
      .setCode(setting.code)
      .setProperties(
        setting.properties.map((param) =>
          param.key === PropertyKeyEnum.COUNTER
            ? new Property.Builder()
                .copy(param)
                .setValue(StringNumberUtils.incrementAndFormat(param.value))
                .build()
            : param,
        ),
      )
      .build();
  }
}
