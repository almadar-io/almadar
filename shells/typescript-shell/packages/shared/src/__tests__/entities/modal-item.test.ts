import { describe, it, expect } from 'vitest';
import type { ModalItem, ModalItemInput } from '../../types/entities';
import { modalItemSchema, modalItemInputSchema } from '../../schemas/entities';

describe('ModalItem Entity', () => {
  describe('modalItemSchema', () => {
    it('should validate a complete entity', () => {
      const validModalItem: ModalItem = {
        id: 'test-id',
        title: 'test-value',
        content: 'test-value',
      };
      const result = modalItemSchema.safeParse(validModalItem);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as ModalItem;
      const result = modalItemSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('modalItemInputSchema', () => {
    it('should validate input for creation', () => {
      const input: ModalItemInput = {
        title: 'test-value',
        content: 'test-value',
      };
      const result = modalItemInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(modalItemSchema.shape).toHaveProperty('id');
    });

    it('should have title field in schema', () => {
      expect(modalItemSchema.shape).toHaveProperty('title');
    });

    it('should have content field in schema', () => {
      expect(modalItemSchema.shape).toHaveProperty('content');
    });

  });
});
