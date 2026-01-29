/**
 * Template Compliance Tests
 *
 * These tests verify that std/* behavior TEMPLATES use correct syntax.
 * std/* behaviors are GENERATION TEMPLATES that LLMs reference when
 * generating inline traits. They must show correct patterns.
 *
 * @packageDocumentation
 */

import { describe, it, expect } from 'vitest';
import { UI_INTERACTION_BEHAVIORS } from '../ui-interaction.js';
import { STANDARD_BEHAVIORS } from '../registry.js';

// Valid pattern types from pattern-utils.ts
const VALID_PATTERNS = [
  'page-header',
  'entity-table',
  'entity-list',
  'entity-cards',
  'entity-detail',
  'form-section',
  'filter-group',
  'stats',
  'game-canvas',
  'game-hud',
  'game-controls',
  'wizard-progress',
  'confirmation',
  'empty-state',
  'dashboard-grid',
  'master-detail',
];

// Deprecated patterns that should NOT be used
const DEPRECATED_PATTERNS = [
  'form-actions',
  'form-fields',
  'form',
  'detail-panel',
  'confirm-dialog',
  'tab-bar',
  'modal-container',
  'drawer-container',
  'wizard-navigation',
];

describe('std/* UI Interaction Behavior Template Compliance', () => {
  for (const behavior of UI_INTERACTION_BEHAVIORS) {
    describe(`${behavior.name}`, () => {
      it('uses render-ui (not render) in effects', () => {
        const transitions = behavior.stateMachine?.transitions || [];
        for (const t of transitions) {
          for (const effect of t.effects || []) {
            // Check that 'render' is not used - should be 'render-ui'
            expect(effect[0]).not.toBe('render');
          }
        }
      });

      it('does not use from: "*" wildcard', () => {
        const transitions = behavior.stateMachine?.transitions || [];
        for (const t of transitions) {
          expect(t.from).not.toBe('*');
        }
      });

      it('has INIT transition from initial state (for interaction behaviors)', () => {
        // Find initial state
        const states = behavior.stateMachine?.states || [];
        const initialState = states.find((s: { isInitial?: boolean }) => s.isInitial);

        if (initialState) {
          const transitions = behavior.stateMachine?.transitions || [];
          const hasInit = transitions.some(
            (t: { event?: string; from?: string }) =>
              t.event === 'INIT' && t.from === initialState.name
          );

          // Modal and Drawer don't need INIT - they start Closed
          if (behavior.name !== 'std/Modal' && behavior.name !== 'std/Drawer') {
            expect(hasInit).toBe(true);
          }
        }
      });

      it('uses valid pattern types in render-ui effects', () => {
        const transitions = behavior.stateMachine?.transitions || [];
        for (const t of transitions) {
          for (const effect of t.effects || []) {
            if (effect[0] === 'render-ui') {
              const pattern = effect[2];
              // null is valid (clear slot)
              if (pattern === null) continue;

              // Pattern should be an object with type property
              if (pattern && typeof pattern === 'object' && 'type' in pattern) {
                const patternType = pattern.type;
                // Skip if it's a binding (e.g., @payload.type)
                if (typeof patternType === 'string' && !patternType.startsWith('@')) {
                  expect(VALID_PATTERNS).toContain(patternType);
                }
              }
            }
          }
        }
      });

      it('does not use deprecated patterns', () => {
        const transitions = behavior.stateMachine?.transitions || [];
        for (const t of transitions) {
          for (const effect of t.effects || []) {
            if (effect[0] === 'render-ui' || effect[0] === 'render') {
              const pattern = effect[2];
              if (pattern && typeof pattern === 'object' && 'type' in pattern) {
                const patternType = pattern.type;
                if (typeof patternType === 'string') {
                  expect(DEPRECATED_PATTERNS).not.toContain(patternType);
                }
              }
              // Also check if pattern is passed as string directly (old format)
              if (typeof pattern === 'string' && !pattern.startsWith('@')) {
                expect(DEPRECATED_PATTERNS).not.toContain(pattern);
              }
            }
          }
        }
      });

      it('form-section patterns include submitEvent (unified prop)', () => {
        const transitions = behavior.stateMachine?.transitions || [];
        for (const t of transitions) {
          for (const effect of t.effects || []) {
            if (effect[0] === 'render-ui') {
              const pattern = effect[2];
              if (
                pattern &&
                typeof pattern === 'object' &&
                'type' in pattern &&
                pattern.type === 'form-section'
              ) {
                // form-section should have submitEvent (unified prop, NOT onSubmit)
                expect(pattern).toHaveProperty('submitEvent');
              }
            }
          }
        }
      });

      it('has states defined as objects with isInitial flag', () => {
        const states = behavior.stateMachine?.states || [];
        expect(states.length).toBeGreaterThan(0);

        // At least one state should have isInitial: true
        const hasInitialState = states.some((s: { isInitial?: boolean }) => s.isInitial === true);
        expect(hasInitialState).toBe(true);

        // All states should be objects with name property
        for (const state of states) {
          expect(typeof state).toBe('object');
          expect(state).toHaveProperty('name');
        }
      });
    });
  }
});

describe('std/Wizard Template - States as Steps', () => {
  const wizard = UI_INTERACTION_BEHAVIORS.find((b) => b.name === 'std/Wizard');

  it('wizard exists', () => {
    expect(wizard).toBeDefined();
  });

  it('wizard uses multiple states for steps (not currentStep index)', () => {
    const states = wizard?.stateMachine?.states || [];
    const stateNames = states.map((s: { name?: string }) => s.name);

    // Should have multiple step states
    expect(stateNames.length).toBeGreaterThanOrEqual(3);

    // Should NOT have just InProgress/Complete (old pattern)
    const hasOnlyTwoStates =
      stateNames.length === 2 &&
      stateNames.includes('InProgress') &&
      stateNames.includes('Complete');
    expect(hasOnlyTwoStates).toBe(false);
  });

  it('wizard does not use currentStep field', () => {
    const entities = wizard?.dataEntities || [];
    for (const entity of entities) {
      const fields = entity.fields || [];
      const hasCurrentStep = fields.some(
        (f: { name?: string }) => f.name === 'currentStep'
      );
      expect(hasCurrentStep).toBe(false);
    }
  });
});

describe('STANDARD_BEHAVIORS Registry', () => {
  it('includes all UI interaction behaviors', () => {
    for (const behavior of UI_INTERACTION_BEHAVIORS) {
      const found = STANDARD_BEHAVIORS.find((b) => b.name === behavior.name);
      expect(found).toBeDefined();
    }
  });

  it('all registered behaviors have valid category', () => {
    const validCategories = ['ui-interaction', 'data-management', 'async', 'feedback', 'game-core', 'game-entity', 'game-ui'];
    for (const behavior of STANDARD_BEHAVIORS) {
      expect(validCategories).toContain(behavior.category);
    }
  });
});
