import { ArrayMapperWithCriteria } from '@lib/fdo-utils/mapper';
import { Injectable } from '@nestjs/common';
import { ISetting, Setting, SettingCriteria } from '~/domain';
import { SettingCriteriaInput, SettingDto, SettingInput } from '../dtos';
import { PropertyMapper } from './property.mapper';

@Injectable()
export class SettingMapper extends ArrayMapperWithCriteria<
  SettingDto,
  SettingInput & Pick<Setting, 'authorId'>,
  Setting,
  SettingCriteriaInput & Pick<SettingCriteria, 'authorId'>,
  SettingCriteria
> {
  constructor(private readonly propertyMapper: PropertyMapper) {
    super();
  }

  public toEntity(data: SettingInput & Pick<Setting, 'authorId'>): Setting {
    return new Setting({
      _id: data?.id,
      code: data?.code,
      properties: this.propertyMapper.toEntityArray(data?.properties),
      authorId: data?.authorId,
    });
  }

  public toDto(data: ISetting): SettingDto {
    return {
      id: data?._id?.toString(),
      code: data?.code,
      properties: this.propertyMapper.toDtoArray(data?.properties),
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
      authorId: data?.authorId,
    };
  }

  public toCriteria(
    data: SettingCriteriaInput & Pick<SettingCriteria, 'authorId'>,
  ): SettingCriteria {
    return new SettingCriteria({
      authorId: data?.authorId,
      id: data?.id,
      code: data?.code,
    });
  }
}
