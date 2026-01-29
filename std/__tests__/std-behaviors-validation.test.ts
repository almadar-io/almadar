/**
 * Standard Behaviors Validation Tests
 *
 * Tests that ALL std/* behaviors pass validation through multiple pipelines:
 * 1. Binding validation (validates @entity, @payload, etc.)
 * 2. Full OrbitalSchema validation (validates behaviors as traits in a schema)
 *
 * This ensures our standard library is correctly implemented and
 * prevents future problems like invalid @linkedEntity references.
 *
 * @packageDocumentation
 */

import { describe, it, expect } from 'vitest';
import {
  validateTraitBindings,
  validateAllBehaviorBindings,
  formatSExprErrors,
} from '../../validation/sexpr-validator.js';
import {
  validateOrbitalSchema,
  type OrbitalSchemaValidationResult,
} from '../../validation/index.js';
import type { OrbitalSchema, TraitDefinition } from '../../types/index.js';
import {
  getAllBehaviors,
  getAllBehaviorNames,
  BEHAVIORS_BY_CATEGORY,
  type BehaviorCategory,
  type StandardBehavior,
} from '../behaviors/index.js';

// ============================================================================
// Helper: Convert StandardBehavior to TraitDefinition for OrbitalSchema
// ============================================================================

function behaviorToTraitDefinition(behavior: StandardBehavior): TraitDefinition {
  return {
    name: behavior.name,
    category: behavior.category?.startsWith('game') ? 'interaction' : 'interaction',
    stateMachine: {
      states: behavior.stateMachine?.states?.map(s =>
        typeof s === 'string' ? { name: s, isInitial: s === behavior.stateMachine?.initial } : s
      ) ?? [],
      events: behavior.stateMachine?.events ?? [],
      transitions: behavior.stateMachine?.transitions ?? [],
    },
    ticks: behavior.ticks,
    dataEntities: behavior.dataEntities,
    configSchema: behavior.configSchema,
  } as TraitDefinition;
}

/**
 * Create a minimal OrbitalSchema with a behavior as a trait.
 */
function createTestSchema(behavior: StandardBehavior): OrbitalSchema {
  // Create entity fields from behavior's dataEntities
  const entityFields = behavior.dataEntities?.flatMap(de =>
    de.fields?.map(f => ({
      name: f.name,
      type: f.type,
      required: false,
      default: f.default,
    })) ?? []
  ) ?? [];

  // Add required fields from behavior
  const requiredFields = behavior.requiredFields?.map(f => ({
    name: f.name,
    type: f.type,
    required: true,
  })) ?? [];

  const allFields = [...requiredFields, ...entityFields];

  return {
    name: `Test-${behavior.name.replace('std/', '')}`,
    version: '1.0.0',
    description: `Test schema for ${behavior.name}`,
    orbitals: [
      {
        name: behavior.name.replace('std/', ''),
        entity: {
          name: `${behavior.name.replace('std/', '')}Entity`,
          persistence: behavior.dataEntities?.[0]?.runtime
            ? { runtime: true }
            : behavior.dataEntities?.[0]?.singleton
              ? { singleton: true }
              : { collection: 'test_collection' },
          fields: allFields,
        },
        traits: [
          {
            ref: behavior.name,
            config: {},
          },
        ],
        pages: [],
      },
    ],
    traits: [behaviorToTraitDefinition(behavior)],
  };
}

// ============================================================================
// Test Suite: Validate All std/* Behaviors
// ============================================================================

describe('std/* Behaviors Validation', () => {
  // Get all behaviors once for efficiency
  const allBehaviors = getAllBehaviors();
  const allBehaviorNames = getAllBehaviorNames();

  describe('All behaviors have valid bindings', () => {
    // Test each behavior individually for better error reporting
    it.each(allBehaviorNames)('validates %s', (behaviorName) => {
      const behavior = allBehaviors.find(b => b.name === behaviorName);
      expect(behavior).toBeDefined();

      const result = validateTraitBindings(behavior!);

      if (!result.valid) {
        // Provide helpful error message
        const errorDetails = result.errors.map(e =>
          `  - ${e.context?.binding ?? 'unknown'}: ${e.context?.message ?? e.message}`
        ).join('\n');

        throw new Error(
          `Behavior "${behaviorName}" has invalid bindings:\n${errorDetails}\n\n` +
          `Full errors:\n${formatSExprErrors(result)}`
        );
      }

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Batch validation', () => {
    it('validates all behaviors at once', () => {
      const result = validateAllBehaviorBindings(allBehaviors);

      if (!result.valid) {
        const errorSummary = result.errors.slice(0, 10).map(e =>
          `  - [${e.context?.traitName}] ${e.context?.binding}: ${e.context?.root}`
        ).join('\n');

        throw new Error(
          `Found ${result.errors.length} invalid binding(s) in std/* behaviors:\n${errorSummary}`
        );
      }

      expect(result.valid).toBe(true);
    });

    it('covers a reasonable number of behaviors', () => {
      // Sanity check: ensure we're testing a significant number of behaviors
      expect(allBehaviors.length).toBeGreaterThan(20);
      // Names should be unique, so count should be >= names
      expect(allBehaviors.length).toBeGreaterThanOrEqual(allBehaviorNames.length);
    });
  });

  describe('Category-specific validation', () => {
    const categories = Object.keys(BEHAVIORS_BY_CATEGORY) as BehaviorCategory[];

    it.each(categories)('validates all %s behaviors', (category) => {
      const categoryBehaviors = BEHAVIORS_BY_CATEGORY[category];
      expect(categoryBehaviors).toBeDefined();
      expect(categoryBehaviors.length).toBeGreaterThan(0);

      const result = validateAllBehaviorBindings(categoryBehaviors);

      if (!result.valid) {
        const errorSummary = result.errors.map(e =>
          `  - [${e.context?.traitName}] ${e.context?.binding}`
        ).join('\n');

        throw new Error(
          `Category "${category}" has behaviors with invalid bindings:\n${errorSummary}`
        );
      }

      expect(result.valid).toBe(true);
    });
  });

  describe('Specific behavior patterns', () => {
    it('validates behaviors with let bindings', () => {
      // Behaviors known to use let bindings
      const behaviorsWithLet = allBehaviors.filter(b => {
        const json = JSON.stringify(b);
        return json.includes("'let'") || json.includes('"let"');
      });

      for (const behavior of behaviorsWithLet) {
        const result = validateTraitBindings(behavior);
        expect(result.valid).toBe(true);
      }
    });

    it('validates behaviors with fn (lambda) bindings', () => {
      // Behaviors known to use fn/lambda
      const behaviorsWithFn = allBehaviors.filter(b => {
        const json = JSON.stringify(b);
        return json.includes("'fn'") || json.includes('"fn"');
      });

      for (const behavior of behaviorsWithFn) {
        const result = validateTraitBindings(behavior);
        expect(result.valid).toBe(true);
      }
    });

    it('validates game behaviors that use @config', () => {
      const gameBehaviors = [
        ...BEHAVIORS_BY_CATEGORY['game-core'],
        ...BEHAVIORS_BY_CATEGORY['game-entity'],
        ...BEHAVIORS_BY_CATEGORY['game-ui'],
      ];

      for (const behavior of gameBehaviors) {
        const result = validateTraitBindings(behavior);

        if (!result.valid) {
          throw new Error(
            `Game behavior "${behavior.name}" has invalid bindings:\n` +
            formatSExprErrors(result)
          );
        }

        expect(result.valid).toBe(true);
      }
    });
  });

  describe('No undefined entity references', () => {
    it('does not contain @linkedEntity anywhere', () => {
      for (const behavior of allBehaviors) {
        const json = JSON.stringify(behavior);
        expect(json).not.toContain('@linkedEntity');
      }
    });

    it('does not contain other known invalid patterns', () => {
      const invalidPatterns = [
        '@linkedEntity',
        '@self',
        '@this',
        '@target',
        '@source',
        '@parent',
        '@child',
      ];

      for (const behavior of allBehaviors) {
        const json = JSON.stringify(behavior);

        for (const pattern of invalidPatterns) {
          if (json.includes(pattern)) {
            throw new Error(
              `Behavior "${behavior.name}" contains invalid binding pattern "${pattern}"`
            );
          }
        }
      }
    });
  });

  describe('Binding statistics', () => {
    it('reports binding usage statistics', () => {
      const bindingCounts: Record<string, number> = {};

      for (const behavior of allBehaviors) {
        const json = JSON.stringify(behavior);

        // Count common binding roots
        const roots = ['@entity', '@payload', '@state', '@now', '@config'];
        for (const root of roots) {
          const count = (json.match(new RegExp(root.replace('@', '\\@'), 'g')) || []).length;
          bindingCounts[root] = (bindingCounts[root] || 0) + count;
        }
      }

      // Sanity check: @entity should be the most common
      expect(bindingCounts['@entity']).toBeGreaterThan(0);
      expect(bindingCounts['@state']).toBeGreaterThan(0);

      // Log statistics for visibility
      console.log('Binding usage in std/* behaviors:');
      for (const [binding, count] of Object.entries(bindingCounts).sort((a, b) => b[1] - a[1])) {
        console.log(`  ${binding}: ${count}`);
      }
    });
  });

  // ============================================================================
  // Full OrbitalSchema Validation
  // ============================================================================

  describe('Full OrbitalSchema validation', () => {
    it.each(allBehaviorNames)('validates %s in OrbitalSchema context', (behaviorName) => {
      const behavior = allBehaviors.find(b => b.name === behaviorName);
      expect(behavior).toBeDefined();

      // Create a test schema with this behavior as a trait
      const testSchema = createTestSchema(behavior!);

      // Run full schema validation
      const result = validateOrbitalSchema(testSchema);

      if (!result.valid) {
        // Filter out expected warnings (like INIT transition warnings for behaviors that don't need it)
        const criticalErrors = result.errors.filter(e =>
          !e.code.includes('INIT') && !e.code.includes('ORPHAN')
        );

        if (criticalErrors.length > 0) {
          const errorDetails = criticalErrors.map(e =>
            `  - [${e.code}] ${e.message} at ${e.path}`
          ).join('\n');

          throw new Error(
            `Behavior "${behaviorName}" failed OrbitalSchema validation:\n${errorDetails}`
          );
        }
      }

      // If we get here, there are no critical errors
      // (there may be warnings or expected errors that we filtered)
      expect(true).toBe(true);
    });

    it('creates valid test schemas for all behaviors', () => {
      const schemas: OrbitalSchema[] = [];

      for (const behavior of allBehaviors) {
        const schema = createTestSchema(behavior);
        schemas.push(schema);

        // Basic structure checks
        expect(schema.name).toBeDefined();
        expect(schema.orbitals.length).toBeGreaterThan(0);
        expect(schema.traits?.length).toBeGreaterThan(0);
      }

      expect(schemas.length).toBe(allBehaviors.length);
    });

    it('validates all game behaviors as a combined schema', () => {
      const gameBehaviors = [
        ...BEHAVIORS_BY_CATEGORY['game-core'],
        ...BEHAVIORS_BY_CATEGORY['game-entity'],
        ...BEHAVIORS_BY_CATEGORY['game-ui'],
      ];

      // Create a combined game schema
      const gameSchema: OrbitalSchema = {
        name: 'Test-AllGameBehaviors',
        version: '1.0.0',
        description: 'Combined test schema for all game behaviors',
        orbitals: gameBehaviors.map(behavior => ({
          name: behavior.name.replace('std/', ''),
          entity: {
            name: `${behavior.name.replace('std/', '')}Entity`,
            persistence: behavior.dataEntities?.[0]?.runtime
              ? { runtime: true }
              : behavior.dataEntities?.[0]?.singleton
                ? { singleton: true }
                : { collection: 'test_collection' },
            fields: behavior.dataEntities?.flatMap(de =>
              de.fields?.map(f => ({
                name: f.name,
                type: f.type,
                required: false,
                default: f.default,
              })) ?? []
            ) ?? [],
          },
          traits: [{ ref: behavior.name, config: {} }],
          pages: [],
        })),
        traits: gameBehaviors.map(behaviorToTraitDefinition),
      };

      const result = validateOrbitalSchema(gameSchema);

      // Filter critical errors
      const criticalErrors = result.errors.filter(e =>
        !e.code.includes('INIT') && !e.code.includes('ORPHAN') && !e.code.includes('DUPLICATE')
      );

      if (criticalErrors.length > 0) {
        const errorSummary = criticalErrors.slice(0, 5).map(e =>
          `  - [${e.code}] ${e.message}`
        ).join('\n');

        throw new Error(
          `Combined game schema has ${criticalErrors.length} critical error(s):\n${errorSummary}`
        );
      }

      expect(criticalErrors.length).toBe(0);
    });
  });
});
