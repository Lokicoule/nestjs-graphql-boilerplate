import { Property, PropertyKeyEnum, Setting, SettingCodeEnum } from '~/domain';
import { ProductSettingsUseCase } from './product-settings.use-case';

describe('ProductUseCase', () => {
  describe('generateCode', () => {
    it('should return a complete code', () => {
      const setting = new Setting({
        code: SettingCodeEnum.CODE_GENERATOR,
        authorId: 'authorId',
        properties: [
          new Property({
            key: PropertyKeyEnum.COUNTER,
            value: '0001',
          }),
          new Property({
            key: PropertyKeyEnum.SUFFIX,
            value: 'SUFFIX',
          }),
          new Property({
            key: PropertyKeyEnum.PREFIX,
            value: 'PREFIX',
          }),
        ],
      });

      const code = ProductSettingsUseCase.buildCode(setting);
      expect(code).toEqual('PREFIX0001SUFFIX');
    });

    it('should return a code without prefix', () => {
      const setting = new Setting({
        code: SettingCodeEnum.CODE_GENERATOR,
        authorId: 'authorId',
        properties: [
          new Property({
            key: PropertyKeyEnum.COUNTER,
            value: '0001',
          }),
          new Property({
            key: PropertyKeyEnum.SUFFIX,
            value: 'SUFFIX',
          }),
        ],
      });

      const code = ProductSettingsUseCase.buildCode(setting);
      expect(code).toEqual('0001SUFFIX');
    });

    it('should return a code without suffix', () => {
      const setting = new Setting({
        code: SettingCodeEnum.CODE_GENERATOR,
        authorId: 'authorId',
        properties: [
          new Property({
            key: PropertyKeyEnum.COUNTER,
            value: '0001',
          }),
          new Property({
            key: PropertyKeyEnum.PREFIX,
            value: 'PREFIX',
          }),
        ],
      });

      const code = ProductSettingsUseCase.buildCode(setting);
      expect(code).toEqual('PREFIX0001');
    });

    it('should return a code without prefix and suffix', () => {
      const setting = new Setting({
        code: SettingCodeEnum.CODE_GENERATOR,
        authorId: 'authorId',
        properties: [
          new Property({
            key: PropertyKeyEnum.COUNTER,
            value: '0001',
          }),
        ],
      });

      const code = ProductSettingsUseCase.buildCode(setting);
      expect(code).toEqual('0001');
    });

    it('should throw an exception when the setting is null', () => {
      expect(() => ProductSettingsUseCase.buildCode(null)).toThrow(
        'The setting is required',
      );
    });

    it('should throw an exception when the counter property is null', () => {
      const setting = new Setting({
        code: SettingCodeEnum.CODE_GENERATOR,
        authorId: 'authorId',
        properties: [
          new Property({
            key: PropertyKeyEnum.SUFFIX,
            value: 'SUFFIX',
          }),
          new Property({
            key: PropertyKeyEnum.PREFIX,
            value: 'PREFIX',
          }),
        ],
      });

      expect(() => ProductSettingsUseCase.buildCode(setting)).toThrow(
        'The counter property is required',
      );
    });
  });

  describe('incrementCode', () => {
    it('should increment the counter', () => {
      const setting = new Setting({
        code: SettingCodeEnum.CODE_GENERATOR,
        authorId: 'authorId',
        properties: [
          new Property({
            key: PropertyKeyEnum.COUNTER,
            value: '0001',
          }),
        ],
      });

      const newSetting = ProductSettingsUseCase.incrementCounter(setting);
      expect(newSetting.properties[0].value).toEqual('0002');
    });

    it("should throw an exception when the counter's value is not a number", () => {
      const setting = new Setting({
        code: SettingCodeEnum.CODE_GENERATOR,
        authorId: 'authorId',
        properties: [
          new Property({
            key: PropertyKeyEnum.COUNTER,
            value: 'NOT_A_NUMBER',
          }),
        ],
      });
      expect(() => ProductSettingsUseCase.incrementCounter(setting)).toThrow(
        'Invalid string number',
      );
    });

    it('should keep other properties values and increment the counter', () => {
      const setting = new Setting({
        code: SettingCodeEnum.CODE_GENERATOR,
        authorId: 'authorId',
        properties: [
          new Property({
            key: PropertyKeyEnum.COUNTER,
            value: '0001',
          }),
          new Property({
            key: PropertyKeyEnum.PREFIX,
            value: 'PREFIX',
          }),
        ],
      });
      const newSetting = ProductSettingsUseCase.incrementCounter(setting);
      expect(newSetting.properties[0].value).toEqual('0002');
      expect(newSetting.properties[1].value).toEqual('PREFIX');
    });

    it('should throw an exception when the setting is null', () => {
      expect(() => ProductSettingsUseCase.incrementCounter(null)).toThrow(
        'The setting is required',
      );
    });

    it('should throw an exception when the setting properties are null', () => {
      const setting = new Setting({
        code: SettingCodeEnum.CODE_GENERATOR,
        authorId: 'authorId',
        properties: null,
      });
      expect(() => ProductSettingsUseCase.incrementCounter(setting)).toThrow(
        'The setting properties are required',
      );
    });
  });
});
