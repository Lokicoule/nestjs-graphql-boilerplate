import { Setting } from '../../domain/entities/setting.entity';
import { PropertyEnum } from '../../domain/enums/property.enum';
import { SettingEnum } from '../../domain/enums/setting.enum';
import { SettingInput } from '../dtos/inputs/setting.input';
import { SettingDto } from '../dtos/setting.dto';
import { SettingMapper } from './setting.mapper';

describe('SettingMapper', () => {
  describe('toEntity', () => {
    it('should return setting', () => {
      const settingInput: SettingInput = {
        id: 'id',
        code: SettingEnum.getEnum().CODE_GENERATOR,
        properties: [
          {
            id: 'id',
            key: PropertyEnum.getEnum().COUNTER,
            value: 'value',
          },
        ],
      };

      const setting: Setting = SettingMapper.toEntity({
        authorId: 'id',
        ...settingInput,
      });

      expect(setting).toEqual({
        _id: settingInput.id,
        code: settingInput.code,
        authorId: 'id',
        properties: [
          {
            _id: settingInput.properties[0].id,
            key: settingInput.properties[0].key,
            value: settingInput.properties[0].value,
          },
        ],
      });
    });
  });

  describe('toDto', () => {
    it('should return settingDto', () => {
      const setting: Setting = new Setting({
        _id: 'id',
        code: SettingEnum.getEnum().CODE_GENERATOR,
        authorId: 'id',
        properties: [
          {
            _id: 'id',
            key: PropertyEnum.getEnum().COUNTER,
            value: 'value',
          },
        ],
      });

      const settingDto: SettingDto = SettingMapper.toDto(setting);

      expect(settingDto).toEqual({
        id: setting._id?.toString(),
        code: setting.code,
        authorId: setting.authorId,
        properties: [
          {
            id: setting.properties[0]._id?.toString(),
            key: setting.properties[0].key,
            value: setting.properties[0].value,
          },
        ],
        createdAt: setting?.createdAt,
        updatedAt: setting?.updatedAt,
      });
    });
  });
});
