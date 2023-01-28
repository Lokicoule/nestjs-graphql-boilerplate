import { ArrayMapperWithCriteria } from '@lib/fdo-utils/mapper';
import { Injectable } from '@nestjs/common';
import { ISetting, Setting, SettingCriteria } from '~/domain';
import { SettingsQuery, SettingOutput, SettingInput } from '../dtos';
import { PropertyMapper } from './property.mapper';

@Injectable()
export class SettingMapper extends ArrayMapperWithCriteria<
  SettingOutput,
  SettingInput & Pick<Setting, 'authorId'>,
  Setting,
  SettingsQuery & Pick<SettingCriteria, 'authorId'>,
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

  public toDto(data: ISetting): SettingOutput {
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
    data: SettingsQuery & Pick<SettingCriteria, 'authorId'>,
  ): SettingCriteria {
    return new SettingCriteria({
      authorId: data?.authorId,
      id: data?.id,
      code: data?.code,
    });
  }
}
