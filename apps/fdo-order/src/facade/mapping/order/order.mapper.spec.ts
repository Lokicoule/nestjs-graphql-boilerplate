import { CustomerBuilder } from '../../../domain/entities/customer/customer.entity.builder';
import { OrderItem } from '../../../domain/entities/order-item/order-item.entity';
import { OrderLifeCycleEnum } from '../../../domain/enums/order/order.enum';
import { Order } from '../../../domain/entities/order/order.entity';
import { CustomerDtoBuilder } from '../../dtos/customer/customer.dto.builder';
import { OrderItemDtoBuilder } from '../../dtos/order-item/order-item.dto.builder';
import { OrderCreateInput } from '../../dtos/order/inputs/order-create.input';
import { OrderCriteriaInput } from '../../dtos/order/inputs/order-criteria.input';
import { OrderUpdateInput } from '../../dtos/order/inputs/order-update.input';
import { OrderDto } from '../../dtos/order/order.dto';
import { OrderDtoBuilder } from '../../dtos/order/order.dto.builder';
import { OrderMapper } from './order.mapper';

describe('OrderMapper', () => {
  describe('mapCriteriaInputToCriteria', () => {
    it('should map a OrderCriteriaInput to a OrderCriteria', () => {
      const orderCriteriaInput: OrderCriteriaInput = {
        id: 'id',
        code: 'code',
        label: 'label',
      } as OrderCriteriaInput;
      const orderCriteria =
        OrderMapper.mapCriteriaInputToCriteria(orderCriteriaInput);
      expect(orderCriteria).toEqual({
        _id: 'id',
        code: 'code',
        label: 'label',
      });
    });

    it('should map a OrderCriteriaInput with undefined values to a clean object without undefined properties', () => {
      const orderCriteriaInput: OrderCriteriaInput = {
        id: undefined,
        code: 'code',
        name: null,
      } as OrderCriteriaInput;
      const orderCriteria =
        OrderMapper.mapCriteriaInputToCriteria(orderCriteriaInput);
      expect(orderCriteria).toEqual({
        code: 'code',
      });
    });
  });

  describe('mapToDto', () => {
    it('successfully maps an entity to a DTO', () => {
      const orderEntity: Order = new Order.Builder()
        .setCode('code')
        .setBillingDate(new Date())
        .setDueDate(new Date())
        .setCustomer(new CustomerBuilder().setCode('code').build())
        .setLifeCycle(OrderLifeCycleEnum.COMPLETED)
        .setItems([new OrderItem.Builder().setAmount(1).build()])
        .build();
      const orderDto: OrderDto = OrderMapper.mapToDto(orderEntity);

      expect(orderDto.code).toEqual(orderEntity.code);
      expect(orderDto.billingDate).toEqual(orderEntity.billingDate);
      expect(orderDto.dueDate).toEqual(orderEntity.dueDate);
      expect(orderDto.customer.code).toEqual(orderEntity.customer.code);
      expect(orderDto.lifeCycle).toEqual(orderEntity.lifeCycle);
      expect(orderDto.items[0].amount).toEqual(orderEntity.items[0].amount);
    });

    it('successfully maps an entity to a DTO with inherited fields and invalid id', () => {
      const sharedDate = new Date();
      const orderEntity = new Order.Builder()
        .setId('id')
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const orderDto = OrderMapper.mapToDto(orderEntity);
      expect(orderDto.id).toEqual(orderEntity._id);
      expect(orderDto.id).toBeUndefined();
      expect(orderDto.createdAt).toEqual(orderEntity.createdAt);
      expect(orderDto.updatedAt).toEqual(orderEntity.updatedAt);
    });

    it('successfully maps an entity to a DTO with inherited fields and valid id', () => {
      const sharedDate = new Date();
      const orderEntity = new Order.Builder()
        .setId(1)
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const orderDto = OrderMapper.mapToDto(orderEntity);
      expect(JSON.stringify(orderDto.id)).toEqual(
        JSON.stringify(orderEntity._id),
      );
      expect(orderDto.createdAt).toEqual(orderEntity.createdAt);
      expect(orderDto.updatedAt).toEqual(orderEntity.updatedAt);
    });
  });

  describe('mapToEntity', () => {
    it('successfully maps a DTO to an entity', () => {
      const orderDto: OrderDto = new OrderDtoBuilder()
        .setId('5e9e9f9b8e7d6a0e6c6f7b6a')
        .setCode('code')
        .setBillingDate(new Date())
        .setDueDate(new Date())
        .setLifeCycle(OrderLifeCycleEnum.CANCELLED)
        .setCustomer(new CustomerDtoBuilder().setCode('code').build())
        .setItems([new OrderItemDtoBuilder().setAmount(1).build()])
        .build();
      const orderEntity: Order = OrderMapper.mapToEntity(orderDto);
      expect(JSON.stringify(orderEntity._id)).toEqual(
        JSON.stringify(orderDto.id),
      );
      expect(orderEntity.code).toEqual(orderDto.code);
      expect(orderEntity.billingDate).toEqual(orderDto.billingDate);
      expect(orderEntity.dueDate).toEqual(orderDto.dueDate);
      expect(orderEntity.lifeCycle).toEqual(orderDto.lifeCycle);
      expect(orderEntity.customer.code).toEqual(orderDto.customer.code);
      expect(orderEntity.items[0].amount).toEqual(orderDto.items[0].amount);
    });

    it('successfully maps a OrderCreateInput to an entity', () => {
      const orderInput: OrderCreateInput = {
        code: 'code',
        billingDate: new Date(),
        dueDate: new Date(),
        lifeCycle: OrderLifeCycleEnum.CANCELLED,
        customer: {
          code: 'code',
        },
        items: [
          {
            amount: 1,
          },
        ],
      } as OrderCreateInput;

      const orderEntity = OrderMapper.mapToEntity(orderInput);
      expect(orderEntity.code).toEqual(orderInput.code);
      expect(orderEntity.billingDate).toEqual(orderInput.billingDate);
      expect(orderEntity.dueDate).toEqual(orderInput.dueDate);
      expect(orderEntity.lifeCycle).toEqual(orderInput.lifeCycle);
      expect(orderEntity.customer.code).toEqual(orderInput.customer.code);
      expect(orderEntity.items[0].amount).toEqual(orderInput.items[0].amount);
    });

    it('successfully maps a OrderUpdateInput to an entity', () => {
      const orderInput: OrderUpdateInput = {
        id: '5e9e9f9b8e7d6a0e6c6f7b6a',
        code: 'code',
        billingDate: new Date(),
        dueDate: new Date(),
        lifeCycle: OrderLifeCycleEnum.CANCELLED,
        customer: {
          code: 'code',
        },
        items: [
          {
            amount: 1,
          },
        ],
      } as OrderUpdateInput;

      const orderEntity = OrderMapper.mapToEntity(orderInput);
      expect(JSON.stringify(orderEntity._id)).toEqual(
        JSON.stringify(orderInput.id),
      );
      expect(orderEntity.code).toEqual(orderInput.code);
      expect(orderEntity.billingDate).toEqual(orderInput.billingDate);
      expect(orderEntity.dueDate).toEqual(orderInput.dueDate);
      expect(orderEntity.lifeCycle).toEqual(orderInput.lifeCycle);
      expect(orderEntity.customer.code).toEqual(orderInput.customer.code);
      expect(orderEntity.items[0].amount).toEqual(orderInput.items[0].amount);
    });
  });
});
