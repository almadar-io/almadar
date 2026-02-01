import { describe, it, expect } from 'vitest';
import type { StateDemo, StateDemoInput } from '../../types/entities';
import { stateDemoSchema, stateDemoInputSchema } from '../../schemas/entities';

describe('StateDemo Entity', () => {
  describe('stateDemoSchema', () => {
    it('should validate a complete entity', () => {
      const validStateDemo: StateDemo = {
        id: 'test-id',
        currentState: 'loading',
      };
      const result = stateDemoSchema.safeParse(validStateDemo);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as StateDemo;
      const result = stateDemoSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('stateDemoInputSchema', () => {
    it('should validate input for creation', () => {
      const input: StateDemoInput = {
        currentState: 'loading',
      };
      const result = stateDemoInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(stateDemoSchema.shape).toHaveProperty('id');
    });

    it('should have currentState field in schema', () => {
      expect(stateDemoSchema.shape).toHaveProperty('currentState');
    });

  });
});
