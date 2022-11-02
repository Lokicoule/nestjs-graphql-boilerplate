import { Property } from './property.entity';
import { PropertyKeyEnum } from '../../enums/property/property.enum';

describe('PropertyBuilder', () => {
  it('successfully set own fields', () => {
    const property: Property = new Property.Builder()
      .setKey(PropertyKeyEnum.COUNTER)
      .setValue('value')
      .build();
    expect(property.key).toEqual(PropertyKeyEnum.COUNTER);
    expect(property.value).toEqual('value');
  });

  it('successfully set key with string value', () => {
    const property: Property = new Property.Builder()
      .setKey('COUNTER')
      .setValue('value')
      .build();
    expect(property.key).toEqual(PropertyKeyEnum.COUNTER);
    expect(property.value).toEqual('value');
  });

  it("should throw an error when key doesn't exist", () => {
    expect(() =>
      new Property.Builder().setKey('INVALID').setValue('value').build(),
    ).toThrowError('Invalid PropertyKeyEnum value: INVALID');
  });

  it('successfully set inherited fields', () => {
    const sharedDate = new Date();
    const property: Property = new Property.Builder()
      .setId(1)
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(property._id).toBeDefined();
    expect(property.createdAt).toEqual(sharedDate);
    expect(property.updatedAt).toEqual(sharedDate);
  });
});
