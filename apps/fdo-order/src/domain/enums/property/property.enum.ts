export enum PropertyKeyEnum {
  COUNTER = 'COUNTER',
  PREFIX = 'PREFIX',
  SUFFIX = 'SUFFIX',
}

function useFactory(value: string): PropertyKeyEnum {
  switch (value.toUpperCase()) {
    case PropertyKeyEnum.COUNTER.toString():
      return PropertyKeyEnum.COUNTER;
    case PropertyKeyEnum.PREFIX.toString():
      return PropertyKeyEnum.PREFIX;
    case PropertyKeyEnum.SUFFIX.toString():
      return PropertyKeyEnum.SUFFIX;
    default:
      throw new Error(`Invalid PropertyKeyEnum value: ${value}`);
  }
}

export const PropertyKeyEnumProvider = {
  provide: 'PropertyKeyEnum',
  useValue: PropertyKeyEnum,
  useFactory,
};
