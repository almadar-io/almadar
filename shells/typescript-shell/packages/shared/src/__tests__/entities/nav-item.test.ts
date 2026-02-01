import { describe, it, expect } from 'vitest';
import type { NavItem, NavItemInput } from '../../types/entities';
import { navItemSchema, navItemInputSchema } from '../../schemas/entities';

describe('NavItem Entity', () => {
  describe('navItemSchema', () => {
    it('should validate a complete entity', () => {
      const validNavItem: NavItem = {
        id: 'test-id',
        label: 'test-value',
        path: 'test-value',
        icon: 'test-value',
      };
      const result = navItemSchema.safeParse(validNavItem);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as NavItem;
      const result = navItemSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('navItemInputSchema', () => {
    it('should validate input for creation', () => {
      const input: NavItemInput = {
        label: 'test-value',
        path: 'test-value',
        icon: 'test-value',
      };
      const result = navItemInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(navItemSchema.shape).toHaveProperty('id');
    });

    it('should have label field in schema', () => {
      expect(navItemSchema.shape).toHaveProperty('label');
    });

    it('should have path field in schema', () => {
      expect(navItemSchema.shape).toHaveProperty('path');
    });

    it('should have icon field in schema', () => {
      expect(navItemSchema.shape).toHaveProperty('icon');
    });

  });
});
