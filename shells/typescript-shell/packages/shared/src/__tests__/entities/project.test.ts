import { describe, it, expect } from 'vitest';
import type { Project, ProjectInput } from '../../types/entities';
import { projectSchema, projectInputSchema } from '../../schemas/entities';

describe('Project Entity', () => {
  describe('projectSchema', () => {
    it('should validate a complete entity', () => {
      const validProject: Project = {
        id: 'test-id',
        name: 'test-value',
        description: 'test-value',
        status: 'planning',
        progress: 42,
        budget: 42,
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-01-01T00:00:00Z',
        teamSize: 42,
      };
      const result = projectSchema.safeParse(validProject);
      expect(result.success).toBe(true);
    });

    it('should reject invalid entity (missing id)', () => {
      const invalid = { } as unknown as Project;
      const result = projectSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('projectInputSchema', () => {
    it('should validate input for creation', () => {
      const input: ProjectInput = {
        name: 'test-value',
        description: 'test-value',
        status: 'planning',
        progress: 42,
        budget: 42,
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-01-01T00:00:00Z',
        teamSize: 42,
      };
      const result = projectInputSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('type structure', () => {
    it('should have id field in schema', () => {
      expect(projectSchema.shape).toHaveProperty('id');
    });

    it('should have name field in schema', () => {
      expect(projectSchema.shape).toHaveProperty('name');
    });

    it('should have description field in schema', () => {
      expect(projectSchema.shape).toHaveProperty('description');
    });

    it('should have status field in schema', () => {
      expect(projectSchema.shape).toHaveProperty('status');
    });

    it('should have progress field in schema', () => {
      expect(projectSchema.shape).toHaveProperty('progress');
    });

    it('should have budget field in schema', () => {
      expect(projectSchema.shape).toHaveProperty('budget');
    });

    it('should have startDate field in schema', () => {
      expect(projectSchema.shape).toHaveProperty('startDate');
    });

    it('should have endDate field in schema', () => {
      expect(projectSchema.shape).toHaveProperty('endDate');
    });

    it('should have teamSize field in schema', () => {
      expect(projectSchema.shape).toHaveProperty('teamSize');
    });

  });
});
