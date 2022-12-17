import { ISetting, Setting } from '../../domain/entities/setting.entity';
import { ISettingDto, SettingDto } from '../dtos/setting.dto';
import { PropertyMapper } from './property.mapper';
import { SettingInput } from '../dtos/inputs/setting.input';
import { SettingCriteriaInput } from '../dtos/inputs/setting-criteria.input';
import { SettingCriteria } from '../../domain/criterias/setting.criteria';

export class SettingMapper {
  public static toEntity(
    data: SettingInput & Pick<Setting, 'authorId'>,
  ): Setting {
    return new Setting({
      _id: data.id,
      code: data.code,
      properties: PropertyMapper.toEntityArray(data.properties),
      authorId: data.authorId,
    });
  }

  public static toDto(data: ISetting): SettingDto {
    return {
      id: data._id?.toString(),
      code: data.code,
      properties: PropertyMapper.toDtoArray(data.properties),
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      authorId: data?.authorId,
    };
  }

  public static toDtoArray(data: ISetting[]): SettingDto[] {
    return data.map((setting) => this.toDto(setting));
  }

  public static toCriteria(
    data: SettingCriteriaInput & Pick<SettingCriteria, 'authorId'>,
  ): SettingCriteria {
    return new SettingCriteria({
      authorId: data?.authorId,
      id: data?.id,
      code: data?.code,
    });
  }
}
