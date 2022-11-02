import { SettingCriteriaBuilder } from './setting.criteria.builder';

describe('SettingCriteriaBuilder', () => {
  describe('build', () => {
    it('successfully build a setting criteria', () => {
      const settingCriteria = new SettingCriteriaBuilder()
        .withId('1')
        .withCode('code')
        .build();

      expect(settingCriteria._id).toBe('1');
      expect(settingCriteria.code).toBe('code');
    });

    it('successfully build a setting criteria with undefined properties', () => {
      const settingCriteria = new SettingCriteriaBuilder().build();

      expect(settingCriteria._id).toBeUndefined();
      expect(settingCriteria.code).toBeUndefined();
    });
  });

  describe('buildCriteria', () => {
    it('should build a clean object without undefined properties', () => {
      const settingCriteria = new SettingCriteriaBuilder()
        .withId(undefined)
        .withCode('code')
        .buildCriteria();
      expect(settingCriteria).toEqual({
        code: 'code',
      });
    });

    it('should build a clean object without undefined properties', () => {
      const settingCriteria = new SettingCriteriaBuilder()
        .withId(undefined)
        .withCode(undefined)
        .buildCriteria();
      expect(settingCriteria).toEqual({});
    });
  });
});
