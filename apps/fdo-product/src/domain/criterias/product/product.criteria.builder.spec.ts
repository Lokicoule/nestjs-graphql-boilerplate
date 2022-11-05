import { ProductCriteriaBuilder } from './product.criteria.builder';

describe('ProductCriteriaBuilder', () => {
  describe('build', () => {
    it('successfully build a Product criteria', () => {
      const productCriteria = new ProductCriteriaBuilder()
        .withId('1')
        .withLabel('label')
        .withCode('code')
        .build();

      expect(productCriteria._id).toBe('1');
      expect(productCriteria.label).toBe('label');
      expect(productCriteria.code).toBe('code');
    });

    it('successfully build a Product criteria with undefined properties', () => {
      const productCriteria = new ProductCriteriaBuilder().build();

      expect(productCriteria._id).toBeUndefined();
      expect(productCriteria.label).toBeUndefined();
      expect(productCriteria.code).toBeUndefined();
    });
  });

  describe('buildCriteria', () => {
    it('should build a clean object without undefined properties', () => {
      const ProductCriteria = new ProductCriteriaBuilder()
        .withLabel('label')
        .withCode('code')
        .buildCriteria();
      expect(ProductCriteria).toEqual({
        label: 'label',
        code: 'code',
      });
    });

    it('should build a clean object without undefined properties', () => {
      const ProductCriteria = new ProductCriteriaBuilder().buildCriteria();
      expect(ProductCriteria).toEqual({});
    });
  });
});
