import { Setting } from '../../../domain/entities/setting/setting.entity';
import { SettingCodeEnum } from '../../../domain/enums/setting/setting.enum';
import { SettingCriteriaInput } from '../../dtos/setting/inputs/setting-criteria.input';
import { SettingDtoBuilder } from '../../dtos/setting/setting.dto.builder';
import { SettingMapper } from './setting.mapper';

describe('SettingMapper', () => {
  describe('mapCriteriaInputToCriteria', () => {
    it('should map a SettingCriteriaInput to a SettingCriteria', () => {
      const settingCriteriaInput: SettingCriteriaInput = {
        id: 'id',
        code: SettingCodeEnum.CODE_GENERATOR,
      } as SettingCriteriaInput;
      const settingCriteria =
        SettingMapper.mapCriteriaInputToCriteria(settingCriteriaInput);
      expect(settingCriteria).toEqual({
        _id: 'id',
        code: SettingCodeEnum.CODE_GENERATOR,
      });
    });

    it('should map a SettingCriteriaInput with undefined values to a clean object without undefined properties', () => {
      const settingCriteriaInput: SettingCriteriaInput = {
        code: SettingCodeEnum.CODE_GENERATOR,
      } as SettingCriteriaInput;
      const settingCriteria =
        SettingMapper.mapCriteriaInputToCriteria(settingCriteriaInput);
      expect(settingCriteria).toEqual({
        code: SettingCodeEnum.CODE_GENERATOR,
      });
    });
  });

  describe('mapToDto', () => {
    it('successfully maps an entity to a DTO', () => {
      const settingEntity = new Setting.Builder()
        .setCode(SettingCodeEnum.CODE_GENERATOR)
        .build();
      const settingDto = SettingMapper.mapToDto(settingEntity);

      expect(settingDto.code).toEqual(settingEntity.code);
    });

    it('successfully maps an entity to a DTO with inherited fields and invalid id', () => {
      const sharedDate = new Date();
      const settingEntity = new Setting.Builder()
        .setId('id')
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const settingDto = SettingMapper.mapToDto(settingEntity);
      expect(settingDto.id).toEqual(settingEntity._id);
      expect(settingDto.id).toBeUndefined();
      expect(settingDto.createdAt).toEqual(settingEntity.createdAt);
      expect(settingDto.updatedAt).toEqual(settingEntity.updatedAt);
    });

    it('successfully maps an entity to a DTO with inherited fields and valid id', () => {
      const sharedDate = new Date();
      const settingEntity = new Setting.Builder()
        .setId(1)
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const settingDto = SettingMapper.mapToDto(settingEntity);
      expect(JSON.stringify(settingDto.id)).toEqual(
        JSON.stringify(settingEntity._id),
      );
      expect(settingDto.createdAt).toEqual(settingEntity.createdAt);
      expect(settingDto.updatedAt).toEqual(settingEntity.updatedAt);
    });
  });

  describe('mapToEntity', () => {
    it('successfully maps a DTO to an entity', () => {
      const settingDto = new SettingDtoBuilder()
        .setCode(SettingCodeEnum.CODE_GENERATOR)
        .build();
      const settingEntity = SettingMapper.mapToEntity(settingDto);

      expect(settingEntity.code).toEqual(settingDto.code);
    });

    it('successfully maps a SettingCreateInput to an entity', () => {
      const settingCreateInput = new SettingDtoBuilder()
        .setCode(SettingCodeEnum.CODE_GENERATOR)
        .build();
      const settingEntity = SettingMapper.mapToEntity(settingCreateInput);

      expect(settingEntity.code).toEqual(settingCreateInput.code);
    });

    it('successfully maps a SettingUpdateInput to an entity', () => {
      const settingUpdateInput = new SettingDtoBuilder()
        .setCode(SettingCodeEnum.CODE_GENERATOR)
        .build();
      const settingEntity = SettingMapper.mapToEntity(settingUpdateInput);

      expect(settingEntity.code).toEqual(settingUpdateInput.code);
    });
  });
});
