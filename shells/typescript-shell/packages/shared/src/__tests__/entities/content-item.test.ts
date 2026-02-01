import { describe, it, expect } from 'vitest';
import type { ContentItem, ContentItemInput } from '../../types/entities';
import { contentItemSchema, contentItemInputSchema } from '../../schemas/entities';

describe('ContentItem Entity', () => {
  describe('contentItemSchema', () => {
    it('should validate a complete entity', () => {
      const validContentItem: ContentItem = {
        id: 'test-id',
        title: 'test-value',
        content: 'test-value',
        isExpanded: false,
      };
      const result = contentItemSchema.safeParse(validContentItem);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as ContentItem;
      const result = contentItemSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('contentItemInputSchema', () => {
    it('should validate input for creation', () => {
      const input: ContentItemInput = {
        title: 'test-value',
        content: 'test-value',
        isExpanded: false,
      };
      const result = contentItemInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(contentItemSchema.shape).toHaveProperty('id');
    });

    it('should have title field in schema', () => {
      expect(contentItemSchema.shape).toHaveProperty('title');
    });

    it('should have content field in schema', () => {
      expect(contentItemSchema.shape).toHaveProperty('content');
    });

    it('should have isExpanded field in schema', () => {
      expect(contentItemSchema.shape).toHaveProperty('isExpanded');
    });

  });
});
