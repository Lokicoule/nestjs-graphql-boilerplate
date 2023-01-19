import { UseCaseException } from '@lib/fdo-domain';
import { StringNumberUtils } from '@lib/fdo-utils';
import { Property, PropertyKeyEnum, Setting, SettingCodeEnum } from '~/domain';

export class ProductSettingsUseCase {
  public static buildCode(setting: Setting): string {
    if (!Boolean(setting)) {
      throw new UseCaseException('The setting is required');
    }

    if (setting.code !== SettingCodeEnum.CODE_GENERATOR) {
      throw new UseCaseException('The setting code is not valid');
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

    return new Setting({
      _id: setting?._id,
      authorId: setting.authorId,
      code: setting.code,
      properties: setting.properties.map((param) =>
        param.key === PropertyKeyEnum.COUNTER
          ? new Property({
              key: param.key,
              value: StringNumberUtils.incrementAndFormat(param.value),
            })
          : param,
      ),
    });
  }

  public static initializeCodeGeneratorSetting(authorId: string): Setting {
    return new Setting({
      authorId,
      code: SettingCodeEnum.CODE_GENERATOR,
      properties: [
        new Property({
          key: PropertyKeyEnum.COUNTER,
          value: '000',
        }),
        new Property({
          key: PropertyKeyEnum.SUFFIX,
          value: 'P',
        }),
      ],
    });
  }
}
