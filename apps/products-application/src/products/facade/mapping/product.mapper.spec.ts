import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../../domain/entities/product.entity';
import { ProductDto } from '../dtos/product.dto';
import { ProductMapper } from './product.mapper';

describe('ProductMapper', () => {
  let productMapper: ProductMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductMapper],
    }).compile();

    productMapper = module.get<ProductMapper>(ProductMapper);
  });

  it('should be defined', () => {
    expect(productMapper).toBeDefined();
  });

  describe('toEntity', () => {
    it('should return a Product entity', () => {
      const product = productMapper.toEntity({
        authorId: 'authorId',
        code: 'code',
        id: 'id',
        label: 'label',
      });
      const createProduct = productMapper.toEntity({
        authorId: 'authorId',
        code: 'code',
        label: 'label',
      });
      expect(product).toBeInstanceOf(Product);
      expect(createProduct).toBeInstanceOf(Product);
    });
  });
  describe('toDto', () => {
    it('should return a ProductDto', () => {
      const product = productMapper.toDto(
        new Product({
          _id: 'id',
          authorId: 'authorId',
          code: 'code',
          label: 'label',
        }),
      );
      expect(product).toBeInstanceOf(ProductDto);
    });
  });
});
