import { describe, it, expect } from 'vitest';
import type { ContainerDemo, ContainerDemoInput } from '../../types/entities';
import { containerDemoSchema, containerDemoInputSchema } from '../../schemas/entities';

describe('ContainerDemo Entity', () => {
  describe('containerDemoSchema', () => {
    it('should validate a complete entity', () => {
      const validContainerDemo: ContainerDemo = {
        id: 'test-id',
        isOpen: false,
      };
      const result = containerDemoSchema.safeParse(validContainerDemo);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as ContainerDemo;
      const result = containerDemoSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('containerDemoInputSchema', () => {
    it('should validate input for creation', () => {
      const input: ContainerDemoInput = {
        isOpen: false,
      };
      const result = containerDemoInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(containerDemoSchema.shape).toHaveProperty('id');
    });

    it('should have isOpen field in schema', () => {
      expect(containerDemoSchema.shape).toHaveProperty('isOpen');
    });

  });
});
