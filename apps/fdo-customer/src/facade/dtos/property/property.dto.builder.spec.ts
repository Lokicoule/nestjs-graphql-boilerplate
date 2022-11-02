import { PropertyKeyEnum } from '../../../domain/enums/property/property.enum';
import { PropertyDto } from './property.dto';
import { PropertyDtoBuilder } from './property.dto.builder';

describe('PropertyDtoBuilder', () => {
  it('successfully set own fields', () => {
    const property: PropertyDto = new PropertyDtoBuilder()
      .setKey(PropertyKeyEnum.COUNTER)
      .setValue('value')
      .build();
    expect(property.key).toEqual(PropertyKeyEnum.COUNTER);
    expect(property.value).toEqual('value');
  });

  it('successfully set key with string value', () => {
    const property: PropertyDto = new PropertyDtoBuilder()
      .setKey('COUNTER')
      .setValue('value')
      .build();
    expect(property.key).toEqual(PropertyKeyEnum.COUNTER);
    expect(property.value).toEqual('value');
  });

  it("should throw an error when key doesn't exist", () => {
    expect(() =>
      new PropertyDtoBuilder().setKey('INVALID').setValue('value').build(),
    ).toThrowError('Invalid PropertyKeyEnum value: INVALID');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const property: PropertyDto = new PropertyDtoBuilder()
      .setId('id')
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(property.id).toEqual('id');
    expect(property.createdAt).toEqual(sharedDate);
    expect(property.updatedAt).toEqual(sharedDate);
  });
});
