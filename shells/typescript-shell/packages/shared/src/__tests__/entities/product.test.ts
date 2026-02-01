import { describe, it, expect } from 'vitest';
import type { Product, ProductInput } from '../../types/entities';
import { productSchema, productInputSchema } from '../../schemas/entities';

describe('Product Entity', () => {
  describe('productSchema', () => {
    it('should validate a complete entity', () => {
      const validProduct: Product = {
        id: 'test-id',
        name: 'test-value',
        description: 'test-value',
        price: 42,
        stock: 42,
        category: 'electronics',
        status: 'active',
        createdAt: '2024-01-01T00:00:00Z',
      };
      const result = productSchema.safeParse(validProduct);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as Product;
      const result = productSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('productInputSchema', () => {
    it('should validate input for creation', () => {
      const input: ProductInput = {
        name: 'test-value',
        description: 'test-value',
        price: 42,
        stock: 42,
        category: 'electronics',
        status: 'active',
      };
      const result = productInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(productSchema.shape).toHaveProperty('id');
    });

    it('should have name field in schema', () => {
      expect(productSchema.shape).toHaveProperty('name');
    });

    it('should have description field in schema', () => {
      expect(productSchema.shape).toHaveProperty('description');
    });

    it('should have price field in schema', () => {
      expect(productSchema.shape).toHaveProperty('price');
    });

    it('should have stock field in schema', () => {
      expect(productSchema.shape).toHaveProperty('stock');
    });

    it('should have category field in schema', () => {
      expect(productSchema.shape).toHaveProperty('category');
    });

    it('should have status field in schema', () => {
      expect(productSchema.shape).toHaveProperty('status');
    });

    it('should have createdAt field in schema', () => {
      expect(productSchema.shape).toHaveProperty('createdAt');
    });

  });
});
