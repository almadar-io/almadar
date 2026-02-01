import { describe, it, expect } from 'vitest';
import type { LayoutDemo, LayoutDemoInput } from '../../types/entities';
import { layoutDemoSchema, layoutDemoInputSchema } from '../../schemas/entities';

describe('LayoutDemo Entity', () => {
  describe('layoutDemoSchema', () => {
    it('should validate a complete entity', () => {
      const validLayoutDemo: LayoutDemo = {
        id: 'test-id',
        layoutType: 'split',
      };
      const result = layoutDemoSchema.safeParse(validLayoutDemo);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as LayoutDemo;
      const result = layoutDemoSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('layoutDemoInputSchema', () => {
    it('should validate input for creation', () => {
      const input: LayoutDemoInput = {
        layoutType: 'split',
      };
      const result = layoutDemoInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(layoutDemoSchema.shape).toHaveProperty('id');
    });

    it('should have layoutType field in schema', () => {
      expect(layoutDemoSchema.shape).toHaveProperty('layoutType');
    });

  });
});
