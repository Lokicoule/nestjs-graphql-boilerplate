import { Property } from '../../domain/entities/property/property.entity';
import { Setting } from '../../domain/entities/setting/setting.entity';
import { PropertyKeyEnum } from '../../domain/enums/property/property.enum';
import { SettingCodeEnum } from '../../domain/enums/setting/setting.enum';
import { OrderUseCase } from './order.use-case';

describe('OrderUseCase', () => {
  describe('generateCode', () => {
    it('should return a complete code', () => {
      const setting = new Setting.Builder()
        .setCode(SettingCodeEnum.CODE_GENERATOR)
        .setProperties([
          new Property.Builder()
            .setKey(PropertyKeyEnum.COUNTER)
            .setValue('0001')
            .build(),
          new Property.Builder()
            .setKey(PropertyKeyEnum.SUFFIX)
            .setValue('SUFFIX')
            .build(),
          new Property.Builder()
            .setKey(PropertyKeyEnum.PREFIX)
            .setValue('PREFIX')
            .build(),
        ])
        .build();
      const code = OrderUseCase.generateCode(setting);
      expect(code).toEqual('PREFIX0001SUFFIX');
    });

    it('should return a code without prefix', () => {
      const setting = new Setting.Builder()
        .setCode(SettingCodeEnum.CODE_GENERATOR)
        .setProperties([
          new Property.Builder()
            .setKey(PropertyKeyEnum.COUNTER)
            .setValue('0001')
            .build(),
          new Property.Builder()
            .setKey(PropertyKeyEnum.SUFFIX)
            .setValue('SUFFIX')
            .build(),
        ])
        .build();
      const code = OrderUseCase.generateCode(setting);
      expect(code).toEqual('0001SUFFIX');
    });

    it('should return a code without suffix', () => {
      const setting = new Setting.Builder()
        .setCode(SettingCodeEnum.CODE_GENERATOR)
        .setProperties([
          new Property.Builder()
            .setKey(PropertyKeyEnum.COUNTER)
            .setValue('0001')
            .build(),
          new Property.Builder()
            .setKey(PropertyKeyEnum.PREFIX)
            .setValue('PREFIX')
            .build(),
        ])
        .build();
      const code = OrderUseCase.generateCode(setting);
      expect(code).toEqual('PREFIX0001');
    });

    it('should return a code without prefix and suffix', () => {
      const setting = new Setting.Builder()
        .setCode(SettingCodeEnum.CODE_GENERATOR)
        .setProperties([
          new Property.Builder()
            .setKey(PropertyKeyEnum.COUNTER)
            .setValue('0001')
            .build(),
        ])
        .build();
      const code = OrderUseCase.generateCode(setting);
      expect(code).toEqual('0001');
    });

    it('should throw an exception when the setting is null', () => {
      expect(() => OrderUseCase.generateCode(null)).toThrow(
        'The setting is required',
      );
    });

    it('should throw an exception when the setting properties are null', () => {
      const setting = new Setting.Builder()
        .setCode(SettingCodeEnum.CODE_GENERATOR)
        .build();
      expect(() => OrderUseCase.generateCode(setting)).toThrow(
        'The setting properties are required',
      );
    });

    it('should throw an exception when the counter property is null', () => {
      const setting = new Setting.Builder()
        .setCode(SettingCodeEnum.CODE_GENERATOR)

        .setProperties([
          new Property.Builder()
            .setKey(PropertyKeyEnum.PREFIX)
            .setValue('PREFIX')
            .build(),
        ])
        .build();
      expect(() => OrderUseCase.generateCode(setting)).toThrow(
        'The counter property is required',
      );
    });
  });

  describe('incrementCode', () => {
    it('should increment the counter', () => {
      const setting = new Setting.Builder()
        .setProperties([
          new Property.Builder()
            .setKey(PropertyKeyEnum.COUNTER)
            .setValue('0001')
            .build(),
        ])
        .build();
      const newSetting = OrderUseCase.incrementCounter(setting);
      expect(newSetting.properties[0].value).toEqual('0002');
    });

    it("should throw an exception when the counter's value is not a number", () => {
      const setting = new Setting.Builder()
        .setProperties([
          new Property.Builder()
            .setKey(PropertyKeyEnum.COUNTER)
            .setValue('NOT_A_NUMBER')
            .build(),
        ])
        .build();
      expect(() => OrderUseCase.incrementCounter(setting)).toThrow(
        'Invalid string number',
      );
    });

    it('should keep other properties values and increment the counter', () => {
      const setting = new Setting.Builder()
        .setProperties([
          new Property.Builder()
            .setKey(PropertyKeyEnum.COUNTER)
            .setValue('0001')
            .build(),
          new Property.Builder()
            .setKey(PropertyKeyEnum.PREFIX)
            .setValue('PREFIX')
            .build(),
        ])
        .build();
      const newSetting = OrderUseCase.incrementCounter(setting);
      expect(newSetting.properties[0].value).toEqual('0002');
      expect(newSetting.properties[1].value).toEqual('PREFIX');
    });

    it('should throw an exception when the setting is null', () => {
      expect(() => OrderUseCase.incrementCounter(null)).toThrow(
        'The setting is required',
      );
    });

    it('should throw an exception when the setting properties are null', () => {
      const setting = new Setting.Builder().build();
      expect(() => OrderUseCase.incrementCounter(setting)).toThrow(
        'The setting properties are required',
      );
    });
  });
});
