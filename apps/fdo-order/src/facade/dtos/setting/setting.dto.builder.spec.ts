import { SettingCodeEnum } from '../../../domain/enums/setting/setting.enum';
import { PropertyDtoBuilder } from '../property/property.dto.builder';
import { SettingDto } from './setting.dto';
import { SettingDtoBuilder } from './setting.dto.builder';

describe('SettingDtoBuilder', () => {
  it('successfully set own fields', () => {
    const settingDto: SettingDto = new SettingDtoBuilder()
      .setCode(SettingCodeEnum.CODE_GENERATOR)
      .setProperties([
        new PropertyDtoBuilder().setKey('COUNTER').setValue('value').build(),
      ])
      .build();

    expect(settingDto.code).toEqual(SettingCodeEnum.CODE_GENERATOR);
    expect(settingDto.properties).toHaveLength(1);
    expect(settingDto.properties[0].key).toEqual('COUNTER');
  });

  it('successfully set code with string value', () => {
    const settingDto: SettingDto = new SettingDtoBuilder()
      .setCode('CODE_GENERATOR')
      .setProperties([
        new PropertyDtoBuilder().setKey('COUNTER').setValue('value').build(),
      ])
      .build();

    expect(settingDto.code).toEqual(SettingCodeEnum.CODE_GENERATOR);
    expect(settingDto.properties).toHaveLength(1);
    expect(settingDto.properties[0].key).toEqual('COUNTER');
  });

  it("should throw an error when code doesn't exist", () => {
    expect(() =>
      new SettingDtoBuilder().setCode('INVALID').build(),
    ).toThrowError('Invalid SettingCodeEnum value: INVALID');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const settingDto: SettingDto = new SettingDtoBuilder()
      .setId('id')
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(settingDto.id).toEqual('id');
    expect(settingDto.createdAt).toEqual(sharedDate);
    expect(settingDto.updatedAt).toEqual(sharedDate);
  });
});
