import { describe, it, expect } from 'vitest';
import type { MoleculeDemo, MoleculeDemoInput } from '../../types/entities';
import { moleculeDemoSchema, moleculeDemoInputSchema } from '../../schemas/entities';

describe('MoleculeDemo Entity', () => {
  describe('moleculeDemoSchema', () => {
    it('should validate a complete entity', () => {
      const validMoleculeDemo: MoleculeDemo = {
        id: 'test-id',
        name: 'test-value',
        category: 'test-value',
        searchTerm: 'test-value',
      };
      const result = moleculeDemoSchema.safeParse(validMoleculeDemo);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as MoleculeDemo;
      const result = moleculeDemoSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('moleculeDemoInputSchema', () => {
    it('should validate input for creation', () => {
      const input: MoleculeDemoInput = {
        name: 'test-value',
        category: 'test-value',
        searchTerm: 'test-value',
      };
      const result = moleculeDemoInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(moleculeDemoSchema.shape).toHaveProperty('id');
    });

    it('should have name field in schema', () => {
      expect(moleculeDemoSchema.shape).toHaveProperty('name');
    });

    it('should have category field in schema', () => {
      expect(moleculeDemoSchema.shape).toHaveProperty('category');
    });

    it('should have searchTerm field in schema', () => {
      expect(moleculeDemoSchema.shape).toHaveProperty('searchTerm');
    });

  });
});
