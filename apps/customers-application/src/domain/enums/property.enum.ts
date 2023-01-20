export enum PropertyKeyEnum {
  COUNTER = 'COUNTER',
  PREFIX = 'PREFIX',
  SUFFIX = 'SUFFIX',
}

function getValue(value: string): PropertyKeyEnum {
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

export const PropertyEnum = {
  provider: 'PropertyKeyEnum',
  getEnum: () => PropertyKeyEnum,
  getValue,
};
