import { CustomerCriteriaBuilder } from './customer.criteria.builder';

describe('CustomerCriteriaBuilder', () => {
  describe('build', () => {
    it('successfully build a customer criteria', () => {
      const customerCriteria = new CustomerCriteriaBuilder()
        .withId('1')
        .withName('name')
        .withCode('code')
        .build();

      expect(customerCriteria._id).toBe('1');
      expect(customerCriteria.name).toBe('name');
      expect(customerCriteria.code).toBe('code');
    });

    it('successfully build a customer criteria with undefined properties', () => {
      const customerCriteria = new CustomerCriteriaBuilder().build();

      expect(customerCriteria._id).toBeUndefined();
      expect(customerCriteria.name).toBeUndefined();
      expect(customerCriteria.code).toBeUndefined();
    });
  });

  describe('buildCriteria', () => {
    it('should build a clean object without undefined properties', () => {
      const customerCriteria = new CustomerCriteriaBuilder()
        .withId(undefined)
        .withName('name')
        .withCode('code')
        .buildCriteria();
      expect(customerCriteria).toEqual({
        name: 'name',
        code: 'code',
      });
    });

    it('should build a clean object without undefined properties', () => {
      const customerCriteria = new CustomerCriteriaBuilder()
        .withId(undefined)
        .withName(undefined)
        .withCode(undefined)
        .buildCriteria();
      expect(customerCriteria).toEqual({});
    });
  });
});
