import { EntityBuilder } from './entity.builder';
import { EntityModel } from './entity.model';

describe('EntityBuilder', () => {
  it('successfully set dates fields', () => {
    const sharedDate = new Date();
    const entity: EntityModel = new EntityBuilder()
      .setCreatedAt(sharedDate)
      .setUpdatedAt(sharedDate)
      .build();

    expect(entity.createdAt).toEqual(sharedDate);
    expect(entity.updatedAt).toEqual(sharedDate);
  });

  it('unsuccessfully set id field', () => {
    const entity: EntityModel = new EntityBuilder().setId('id').build();

    expect(entity._id).toBeUndefined();
  });

  it('successfully set id field', () => {
    const entity: EntityModel = new EntityBuilder()
      .setId('5e9e9f9b8e7d6a0e6c6f7b6a')
      .build();

    expect(entity._id).toBeDefined();
  });
});
