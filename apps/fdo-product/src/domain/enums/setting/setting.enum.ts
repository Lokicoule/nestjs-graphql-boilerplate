export enum SettingCodeEnum {
  CODE_GENERATOR = 'CODE_GENERATOR',
}

function useFactory(value: string): SettingCodeEnum {
  switch (value.toUpperCase()) {
    case SettingCodeEnum.CODE_GENERATOR.toString():
      return SettingCodeEnum.CODE_GENERATOR;
    default:
      throw new Error(`Invalid SettingCodeEnum value: ${value}`);
  }
}

export const SettingCodeEnumProvider = {
  provide: 'SettingCodeEnum',
  useValue: SettingCodeEnum,
  useFactory,
};
