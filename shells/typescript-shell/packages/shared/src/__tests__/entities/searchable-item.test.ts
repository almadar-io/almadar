import { describe, it, expect } from 'vitest';
import type { SearchableItem, SearchableItemInput } from '../../types/entities';
import { searchableItemSchema, searchableItemInputSchema } from '../../schemas/entities';

describe('SearchableItem Entity', () => {
  describe('searchableItemSchema', () => {
    it('should validate a complete entity', () => {
      const validSearchableItem: SearchableItem = {
        id: 'test-id',
        title: 'test-value',
        category: 'tech',
        priority: 'low',
        isActive: false,
      };
      const result = searchableItemSchema.safeParse(validSearchableItem);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as SearchableItem;
      const result = searchableItemSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('searchableItemInputSchema', () => {
    it('should validate input for creation', () => {
      const input: SearchableItemInput = {
        title: 'test-value',
        category: 'tech',
        priority: 'low',
        isActive: false,
      };
      const result = searchableItemInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(searchableItemSchema.shape).toHaveProperty('id');
    });

    it('should have title field in schema', () => {
      expect(searchableItemSchema.shape).toHaveProperty('title');
    });

    it('should have category field in schema', () => {
      expect(searchableItemSchema.shape).toHaveProperty('category');
    });

    it('should have priority field in schema', () => {
      expect(searchableItemSchema.shape).toHaveProperty('priority');
    });

    it('should have isActive field in schema', () => {
      expect(searchableItemSchema.shape).toHaveProperty('isActive');
    });

  });
});
