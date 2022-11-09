import { Customer } from '../../entities/customer/customer.entity';
import { CustomerCriteria } from '../customer/customer.criteria';
import { CustomerCriteriaBuilder } from '../customer/customer.criteria.builder';
import { OrderCriteriaBuilder } from './order.criteria.builder';

describe('OrderCriteriaBuilder', () => {
  describe('build', () => {
    it('successfully build a Order criteria', () => {
      const orderCriteria = new OrderCriteriaBuilder()
        .withId('1')
        .withCode('code')
        .build();

      expect(orderCriteria._id).toBe('1');
      expect(orderCriteria.code).toBe('code');
    });

    it('successfully build a Order criteria with undefined properties', () => {
      const orderCriteria = new OrderCriteriaBuilder().build();

      expect(orderCriteria._id).toBeUndefined();
      expect(orderCriteria.code).toBeUndefined();
    });
  });

  describe('buildCriteria', () => {
    it('should build a clean object without undefined properties', () => {
      const OrderCriteria = new OrderCriteriaBuilder()
        .withCode('code')
        .withCustomer(
          new CustomerCriteriaBuilder().withCode('code').buildCriteria(),
        )
        .withLifeCycle('lifeCycle')
        .buildCriteria();
      expect(OrderCriteria).toEqual({
        code: 'code',
        customer: { code: 'code' },
        lifeCycle: 'lifeCycle',
      });
    });

    it('should build a clean object without undefined properties', () => {
      const OrderCriteria = new OrderCriteriaBuilder().buildCriteria();
      expect(OrderCriteria).toEqual({});
    });
  });
});
