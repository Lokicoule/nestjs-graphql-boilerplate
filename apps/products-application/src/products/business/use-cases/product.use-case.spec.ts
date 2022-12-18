import { cp } from 'fs';
import { Property } from '../../../settings/domain/entities/property.entity';
import { Setting } from '../../../settings/domain/entities/setting.entity';
import { PropertyKeyEnum } from '../../../settings/domain/enums/property.enum';
import { SettingCodeEnum } from '../../../settings/domain/enums/setting.enum';
import { ProductUseCase } from './product.use-case';

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

      const code = ProductUseCase.generateCode(setting);
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

      const code = ProductUseCase.generateCode(setting);
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

      const code = ProductUseCase.generateCode(setting);
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

      const code = ProductUseCase.generateCode(setting);
      expect(code).toEqual('0001');
    });

    it('should throw an exception when the setting is null', () => {
      expect(() => ProductUseCase.generateCode(null)).toThrow(
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

      expect(() => ProductUseCase.generateCode(setting)).toThrow(
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

      const newSetting = ProductUseCase.incrementCounter(setting);
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
      expect(() => ProductUseCase.incrementCounter(setting)).toThrow(
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
      const newSetting = ProductUseCase.incrementCounter(setting);
      expect(newSetting.properties[0].value).toEqual('0002');
      expect(newSetting.properties[1].value).toEqual('PREFIX');
    });

    it('should throw an exception when the setting is null', () => {
      expect(() => ProductUseCase.incrementCounter(null)).toThrow(
        'The setting is required',
      );
    });

    it('should throw an exception when the setting properties are null', () => {
      const setting = new Setting({
        code: SettingCodeEnum.CODE_GENERATOR,
        authorId: 'authorId',
        properties: null,
      });
      expect(() => ProductUseCase.incrementCounter(setting)).toThrow(
        'The setting properties are required',
      );
    });
  });
});
