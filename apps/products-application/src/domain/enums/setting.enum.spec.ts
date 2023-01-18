import { SettingEnum } from './setting.enum';

describe('SettingEnum', () => {
  describe('useFactory', () => {
    it('should return the enum value', () => {
      expect(SettingEnum.getValue('CODE_GENERATOR')).toEqual(
        SettingEnum.getEnum().CODE_GENERATOR,
      );
    });

    it('should throw an error', () => {
      expect(() => SettingEnum.getValue('INVALID')).toThrowError(
        'Invalid SettingCodeEnum value: INVALID',
      );
    });
  });
});
