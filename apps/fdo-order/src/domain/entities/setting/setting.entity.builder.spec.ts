import { PropertyKeyEnum } from '../../enums/property/property.enum';
import { SettingCodeEnum } from '../../enums/setting/setting.enum';
import { Property } from '../property/property.entity';
import { Setting } from './setting.entity';

describe('SettingBuilder', () => {
  it('successfully set own fields', () => {
    const setting: Setting = new Setting.Builder()
      .setCode(SettingCodeEnum.CODE_GENERATOR)
      .setProperties([
        new Property.Builder().setKey('COUNTER').setValue('value').build(),
      ])
      .build();

    expect(setting.code).toEqual(SettingCodeEnum.CODE_GENERATOR);
    expect(setting.properties).toHaveLength(1);
    expect(setting.properties[0].key).toEqual(PropertyKeyEnum.COUNTER);
  });

  it('successfully set code with string value', () => {
    const setting: Setting = new Setting.Builder()
      .setCode('CODE_GENERATOR')
      .setProperties([
        new Property.Builder().setKey('COUNTER').setValue('value').build(),
      ])
      .build();

    expect(setting.code).toEqual(SettingCodeEnum.CODE_GENERATOR);
    expect(setting.properties).toHaveLength(1);
    expect(setting.properties[0].key).toEqual(PropertyKeyEnum.COUNTER);
  });

  it("should throw an error when code doesn't exist", () => {
    expect(() => new Setting.Builder().setCode('INVALID').build()).toThrowError(
      'Invalid SettingCodeEnum value: INVALID',
    );
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const setting: Setting = new Setting.Builder()
      .setId(1)
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(setting._id).toBeDefined();
    expect(setting.createdAt).toEqual(sharedDate);
    expect(setting.updatedAt).toEqual(sharedDate);
  });
});
