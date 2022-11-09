import { OrderItem } from '../../../domain/entities/order-item/order-item.entity';
import { Product } from '../../../domain/entities/product/product.entity';
import { OrderItemMapper } from './order-item.mapper';
import { OrderItemDto } from '../../dtos/order-item/order-item.dto';

describe('OrderItemMapper', () => {
  describe('mapToDto', () => {
    it('successfully maps an entity to a DTO', () => {
      const orderItemEntity: OrderItem = new OrderItem.Builder()
        .setProduct(
          new Product.Builder().setCode('code').setLabel('label').build(),
        )
        .setAmount(1)
        .setBatchNumber('batchNumber')
        .setBestBeforeDate(new Date())
        .setContainerNumber('containerNumber')
        .setUnitPrice(1)
        .build();

      const orderItemDto = OrderItemMapper.mapToDto(orderItemEntity);

      expect(orderItemDto.amount).toEqual(1);
      expect(orderItemDto.batchNumber).toEqual('batchNumber');
      expect(orderItemDto.bestBeforeDate).toBeDefined();
      expect(orderItemDto.containerNumber).toEqual('containerNumber');
      expect(orderItemDto.unitPrice).toEqual(1);
      expect(orderItemDto.product.code).toEqual('code');
      expect(orderItemDto.product.label).toEqual('label');
    });

    it('successfully maps an entity to a DTO with inherited fields and invalid id', () => {
      const orderItemEntity: OrderItem = new OrderItem.Builder()
        .setId('invalidId')
        .setCreatedAt(new Date())
        .setUpdatedAt(new Date())
        .build();

      const orderItemDto = OrderItemMapper.mapToDto(orderItemEntity);

      expect(orderItemDto.id).toBeUndefined();
      expect(orderItemDto.createdAt).toBeDefined();
      expect(orderItemDto.updatedAt).toBeDefined();
    });

    it('successfully maps an entity to a DTO with inherited fields and valid id', () => {
      const orderItemEntity: OrderItem = new OrderItem.Builder()
        .setId(1)
        .setCreatedAt(new Date())
        .setUpdatedAt(new Date())
        .build();

      const orderItemDto = OrderItemMapper.mapToDto(orderItemEntity);

      expect(JSON.stringify(orderItemDto.id)).toEqual(
        JSON.stringify(orderItemEntity._id),
      );
      expect(orderItemDto.createdAt).toBeDefined();
      expect(orderItemDto.updatedAt).toBeDefined();
    });
  });

  describe('mapToEntity', () => {
    it('successfully maps a DTO to an entity', () => {
      const orderItemDto = {
        amount: 1,
        batchNumber: 'batchNumber',
        bestBeforeDate: new Date(),
        containerNumber: 'containerNumber',
        unitPrice: 1,
        product: {
          code: 'code',
          label: 'label',
        },
      } as OrderItemDto;

      const orderItemEntity = OrderItemMapper.mapToEntity(orderItemDto);

      expect(orderItemEntity.amount).toEqual(1);
      expect(orderItemEntity.batchNumber).toEqual('batchNumber');
      expect(orderItemEntity.bestBeforeDate).toBeDefined();
      expect(orderItemEntity.containerNumber).toEqual('containerNumber');
      expect(orderItemEntity.unitPrice).toEqual(1);
      expect(orderItemEntity.product.code).toEqual('code');
      expect(orderItemEntity.product.label).toEqual('label');
    });
  });
});
