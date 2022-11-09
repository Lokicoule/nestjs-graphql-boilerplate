import { SettingCriteria } from '../../../domain/criterias/setting/setting.criteria';
import { SettingCriteriaBuilder } from '../../../domain/criterias/setting/setting.criteria.builder';
import { Setting } from '../../../domain/entities/setting/setting.entity';
import { SettingCreateInput } from '../../dtos/setting/inputs/setting-create.input';
import { SettingCriteriaInput } from '../../dtos/setting/inputs/setting-criteria.input';
import { SettingUpdateInput } from '../../dtos/setting/inputs/setting-update.input';
import { SettingInput } from '../../dtos/setting/inputs/setting.input';
import { SettingDto } from '../../dtos/setting/setting.dto';
import { SettingDtoBuilder } from '../../dtos/setting/setting.dto.builder';
import { PropertyMapper } from '../property/property.mapper';

export class SettingMapper {
  public static mapCriteriaInputToCriteria(
    settingCriteria: SettingCriteriaInput,
  ): SettingCriteria {
    const settingCriteriaBuilder = new SettingCriteriaBuilder()
      .withId(settingCriteria?.id)
      .withCode(settingCriteria?.code);
    return settingCriteriaBuilder.buildCriteria();
  }

  public static mapToDto(settingEntity: Setting): SettingDto {
    const settingDto = new SettingDtoBuilder()
      .setId(settingEntity._id?.toString())
      .setCreatedAt(settingEntity.createdAt)
      .setUpdatedAt(settingEntity.updatedAt)
      .setCode(settingEntity.code)
      .setProperties(
        settingEntity.properties?.map((property) =>
          PropertyMapper.mapToDto(property),
        ),
      )
      .build();
    return settingDto;
  }

  public static mapListToDtoList(settingEntities: Setting[]): SettingDto[] {
    return settingEntities.map((settingEntity) => {
      return SettingMapper.mapToDto(settingEntity);
    });
  }

  public static mapToEntity(
    settingDto: SettingDto | Partial<SettingInput>,
  ): Setting {
    const settingEntity = new Setting.Builder()
      .setId(settingDto?.id)
      .setCode(settingDto.code)
      .setProperties(
        settingDto.properties?.map((propertyDto) =>
          PropertyMapper.mapToEntity(propertyDto),
        ),
      )
      .build();
    return settingEntity;
  }
}
