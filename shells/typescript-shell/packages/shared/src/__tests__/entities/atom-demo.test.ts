import { describe, it, expect } from 'vitest';
import type { AtomDemo, AtomDemoInput } from '../../types/entities';
import { atomDemoSchema, atomDemoInputSchema } from '../../schemas/entities';

describe('AtomDemo Entity', () => {
  describe('atomDemoSchema', () => {
    it('should validate a complete entity', () => {
      const validAtomDemo: AtomDemo = {
        id: 'test-id',
        label: 'test-value',
        variant: 'test-value',
        size: 'sm',
        isDisabled: false,
      };
      const result = atomDemoSchema.safeParse(validAtomDemo);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as AtomDemo;
      const result = atomDemoSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('atomDemoInputSchema', () => {
    it('should validate input for creation', () => {
      const input: AtomDemoInput = {
        label: 'test-value',
        variant: 'test-value',
        size: 'sm',
        isDisabled: false,
      };
      const result = atomDemoInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(atomDemoSchema.shape).toHaveProperty('id');
    });

    it('should have label field in schema', () => {
      expect(atomDemoSchema.shape).toHaveProperty('label');
    });

    it('should have variant field in schema', () => {
      expect(atomDemoSchema.shape).toHaveProperty('variant');
    });

    it('should have size field in schema', () => {
      expect(atomDemoSchema.shape).toHaveProperty('size');
    });

    it('should have isDisabled field in schema', () => {
      expect(atomDemoSchema.shape).toHaveProperty('isDisabled');
    });

  });
});
