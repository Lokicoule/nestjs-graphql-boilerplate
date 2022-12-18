export abstract class Mapper<TDto, TDtoInput, TEntity> {
  public abstract toDto(entity: TEntity): TDto;
  public abstract toEntity(dto: TDtoInput): TEntity;
}

export abstract class ArrayMapper<TDto, TDtoInput, TEntity> extends Mapper<
  TDto,
  TDtoInput,
  TEntity
> {
  public toDtoArray(entities: TEntity[]): TDto[] {
    return entities?.map((entity) => this.toDto(entity));
  }

  public toEntityArray(dtos: TDtoInput[]): TEntity[] {
    return dtos?.map((dto) => this.toEntity(dto));
  }
}

export abstract class MapperWithCriteria<
  TDto,
  TDtoInput,
  TEntity,
  TCriteriaDto,
  TCriteriaEntity,
> extends Mapper<TDto, TDtoInput, TEntity> {
  public abstract toCriteria(dto: TCriteriaDto): TCriteriaEntity;
}

export abstract class ArrayMapperWithCriteria<
  TDto,
  TDtoInput,
  TEntity,
  TCriteriaDto,
  TCriteriaEntity,
> extends MapperWithCriteria<
  TDto,
  TDtoInput,
  TEntity,
  TCriteriaDto,
  TCriteriaEntity
> {
  public toDtoArray(entities: TEntity[]): TDto[] {
    return entities?.map((entity) => this.toDto(entity));
  }

  public toEntityArray(dtos: TDtoInput[]): TEntity[] {
    return dtos?.map((dto) => this.toEntity(dto));
  }
}
