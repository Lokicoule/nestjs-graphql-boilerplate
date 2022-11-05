import { Product } from '../../../domain/entities/product/product.entity';
import { ProductCreateInput } from '../../dtos/product/inputs/product-create.input';
import { ProductCriteriaInput } from '../../dtos/product/inputs/product-criteria.input';
import { ProductUpdateInput } from '../../dtos/product/inputs/product-update.input';
import { ProductDto } from '../../dtos/product/product.dto';
import { ProductDtoBuilder } from '../../dtos/product/product.dto.builder';
import { ProductMapper } from './product.mapper';

describe('ProductMapper', () => {
  describe('mapCriteriaInputToCriteria', () => {
    it('should map a ProductCriteriaInput to a ProductCriteria', () => {
      const productCriteriaInput: ProductCriteriaInput = {
        id: 'id',
        code: 'code',
        label: 'label',
      } as ProductCriteriaInput;
      const productCriteria =
        ProductMapper.mapCriteriaInputToCriteria(productCriteriaInput);
      expect(productCriteria).toEqual({
        _id: 'id',
        code: 'code',
        label: 'label',
      });
    });

    it('should map a ProductCriteriaInput with undefined values to a clean object without undefined properties', () => {
      const productCriteriaInput: ProductCriteriaInput = {
        id: undefined,
        code: 'code',
        name: null,
      } as ProductCriteriaInput;
      const productCriteria =
        ProductMapper.mapCriteriaInputToCriteria(productCriteriaInput);
      expect(productCriteria).toEqual({
        code: 'code',
      });
    });
  });

  describe('mapToDto', () => {
    it('successfully maps an entity to a DTO', () => {
      const productEntity: Product = new Product.Builder()
        .setCode('code')
        .setLabel('label')
        .build();
      const productDto: ProductDto = ProductMapper.mapToDto(productEntity);

      expect(productDto.code).toEqual(productEntity.code);
      expect(productDto.label).toEqual(productEntity.label);
    });

    it('successfully maps an entity to a DTO with inherited fields and invalid id', () => {
      const sharedDate = new Date();
      const productEntity = new Product.Builder()
        .setId('id')
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const productDto = ProductMapper.mapToDto(productEntity);
      expect(productDto.id).toEqual(productEntity._id);
      expect(productDto.id).toBeUndefined();
      expect(productDto.createdAt).toEqual(productEntity.createdAt);
      expect(productDto.updatedAt).toEqual(productEntity.updatedAt);
    });

    it('successfully maps an entity to a DTO with inherited fields and valid id', () => {
      const sharedDate = new Date();
      const productEntity = new Product.Builder()
        .setId(1)
        .setCreatedAt(sharedDate)
        .setUpdatedAt(sharedDate)
        .build();

      const productDto = ProductMapper.mapToDto(productEntity);
      expect(JSON.stringify(productDto.id)).toEqual(
        JSON.stringify(productEntity._id),
      );
      expect(productDto.createdAt).toEqual(productEntity.createdAt);
      expect(productDto.updatedAt).toEqual(productEntity.updatedAt);
    });
  });

  describe('mapToEntity', () => {
    it('successfully maps a DTO to an entity', () => {
      const productDto: ProductDto = new ProductDtoBuilder()
        .setId('5e9e9f9b8e7d6a0e6c6f7b6a')
        .setCode('code')
        .setLabel('label')
        .build();
      const productEntity: Product = ProductMapper.mapToEntity(productDto);
      expect(JSON.stringify(productEntity._id)).toEqual(
        JSON.stringify(productDto.id),
      );
      expect(productEntity.code).toEqual(productDto.code);
      expect(productEntity.label).toEqual(productDto.label);
    });

    it('successfully maps a ProductCreateInput to an entity', () => {
      const productInput: ProductCreateInput = {
        code: 'code',
        label: 'label',
      } as ProductCreateInput;

      const productEntity = ProductMapper.mapToEntity(productInput);
      expect(productEntity.code).toEqual(productInput.code);
      expect(productEntity.label).toEqual(productInput.label);
    });

    it('successfully maps a ProductUpdateInput to an entity', () => {
      const productInput: ProductUpdateInput = {
        id: '5e9e9f9b8e7d6a0e6c6f7b6a',
        code: 'code',
        label: 'label',
      } as ProductUpdateInput;

      const productEntity = ProductMapper.mapToEntity(productInput);
      expect(JSON.stringify(productEntity._id)).toEqual(
        JSON.stringify(productInput.id),
      );
      expect(productEntity.code).toEqual(productInput.code);
      expect(productEntity.label).toEqual(productInput.label);
    });
  });
});
