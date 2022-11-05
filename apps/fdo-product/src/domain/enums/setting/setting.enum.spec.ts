import { SettingCodeEnumProvider } from './setting.enum';

describe('SettingEnum', () => {
  describe('useFactory', () => {
    it('should return the enum value', () => {
      expect(SettingCodeEnumProvider.useFactory('CODE_GENERATOR')).toEqual(
        SettingCodeEnumProvider.useValue.CODE_GENERATOR,
      );
    });

    it('should throw an error', () => {
      expect(() => SettingCodeEnumProvider.useFactory('INVALID')).toThrowError(
        'Invalid SettingCodeEnum value: INVALID',
      );
    });
  });
});
