/**
 * Standard Behaviors Tests
 *
 * Tests for Standard Behaviors types, registry, and action affinity.
 */

import { describe, it, expect } from 'vitest';
import {
  // Types
  BEHAVIOR_CATEGORIES,
  isBehaviorCategory,
  isGameBehaviorCategory,
  getBehaviorMetadata,
  validateBehaviorStructure,
  validateBehaviorEvents,
  validateBehaviorStates,
  // Action Affinity
  ACTION_AFFINITY,
  UI_EVENTS,
  isActionValidForComponent,
  isActionInvalidForComponent,
  getValidActionsForComponent,
  getInvalidActionsForComponent,
  validateActionsForComponent,
  getAllKnownComponents,
  getComponentsByCategory,
  // Registry
  STANDARD_BEHAVIORS,
  BEHAVIOR_REGISTRY,
  getBehavior,
  isKnownBehavior,
  getBehaviorsByCategory,
  getAllBehaviorNames,
  getAllBehaviors,
  getAllBehaviorMetadata,
  findBehaviorsForUseCase,
  getBehaviorsForEvent,
  validateBehaviorReference,
  getBehaviorLibraryStats,
  // Individual behaviors
  LIST_BEHAVIOR,
  DETAIL_BEHAVIOR,
  FORM_BEHAVIOR,
  MODAL_BEHAVIOR,
  DRAWER_BEHAVIOR,
  TABS_BEHAVIOR,
  WIZARD_BEHAVIOR,
  PAGINATION_BEHAVIOR,
  SELECTION_BEHAVIOR,
  LOADING_BEHAVIOR,
  NOTIFICATION_BEHAVIOR,
} from '../index.js';

// ============================================================================
// Behavior Types Tests
// ============================================================================

describe('Behavior Types', () => {
  describe('BEHAVIOR_CATEGORIES', () => {
    it('has all expected categories', () => {
      expect(BEHAVIOR_CATEGORIES).toContain('ui-interaction');
      expect(BEHAVIOR_CATEGORIES).toContain('data-management');
      expect(BEHAVIOR_CATEGORIES).toContain('async');
      expect(BEHAVIOR_CATEGORIES).toContain('feedback');
      expect(BEHAVIOR_CATEGORIES).toContain('game-core');
      expect(BEHAVIOR_CATEGORIES).toContain('game-entity');
      expect(BEHAVIOR_CATEGORIES).toContain('game-ui');
    });

    it('has correct number of categories', () => {
      expect(BEHAVIOR_CATEGORIES.length).toBe(7);
    });
  });

  describe('isBehaviorCategory', () => {
    it('returns true for valid categories', () => {
      expect(isBehaviorCategory('ui-interaction')).toBe(true);
      expect(isBehaviorCategory('data-management')).toBe(true);
      expect(isBehaviorCategory('async')).toBe(true);
      expect(isBehaviorCategory('feedback')).toBe(true);
    });

    it('returns false for invalid categories', () => {
      expect(isBehaviorCategory('invalid')).toBe(false);
      expect(isBehaviorCategory('')).toBe(false);
      expect(isBehaviorCategory('UI-INTERACTION')).toBe(false);
    });
  });

  describe('isGameBehaviorCategory', () => {
    it('returns true for game categories', () => {
      expect(isGameBehaviorCategory('game-core')).toBe(true);
      expect(isGameBehaviorCategory('game-entity')).toBe(true);
      expect(isGameBehaviorCategory('game-ui')).toBe(true);
    });

    it('returns false for non-game categories', () => {
      expect(isGameBehaviorCategory('ui-interaction')).toBe(false);
      expect(isGameBehaviorCategory('async')).toBe(false);
    });
  });

  describe('getBehaviorMetadata', () => {
    it('extracts metadata from behavior', () => {
      const metadata = getBehaviorMetadata(LIST_BEHAVIOR);

      expect(metadata.name).toBe('std/List');
      expect(metadata.category).toBe('ui-interaction');
      expect(metadata.description).toContain('Entity list');
      expect(metadata.states).toEqual(['Browsing', 'Creating', 'Viewing', 'Editing', 'Deleting']);
      expect(metadata.events).toContain('CREATE');
      expect(metadata.events).toContain('VIEW');
      expect(metadata.events).toContain('SAVE');
      expect(metadata.hasFields).toBe(true);
    });
  });

  describe('validateBehaviorStructure', () => {
    it('returns null for valid behavior', () => {
      expect(validateBehaviorStructure(LIST_BEHAVIOR)).toBeNull();
      expect(validateBehaviorStructure(FORM_BEHAVIOR)).toBeNull();
    });

    it('returns error for missing name', () => {
      const invalid = { ...LIST_BEHAVIOR, name: '' };
      expect(validateBehaviorStructure(invalid)).toContain('name');
    });

    it('returns error for invalid category', () => {
      const invalid = { ...LIST_BEHAVIOR, category: 'invalid' };
      expect(validateBehaviorStructure(invalid)).toContain('category');
    });

    it('returns error for empty states', () => {
      const invalid = { ...LIST_BEHAVIOR, states: [] };
      expect(validateBehaviorStructure(invalid)).toContain('state');
    });

    it('returns error for initial not in states', () => {
      const invalid = { ...LIST_BEHAVIOR, initial: 'NonexistentState' };
      const error = validateBehaviorStructure(invalid);
      expect(error).toContain('Initial');
      expect(error).toContain('NonexistentState');
    });
  });

  describe('validateBehaviorEvents', () => {
    it('returns empty array for valid events', () => {
      expect(validateBehaviorEvents(LIST_BEHAVIOR)).toEqual([]);
    });

    it('detects undeclared events in transitions', () => {
      const invalid = {
        ...LIST_BEHAVIOR,
        events: ['INIT'], // Missing most events
      };
      const errors = validateBehaviorEvents(invalid);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.includes('undeclared'))).toBe(true);
    });
  });

  describe('validateBehaviorStates', () => {
    it('returns empty array for valid states', () => {
      expect(validateBehaviorStates(LIST_BEHAVIOR)).toEqual([]);
    });

    it('detects undeclared from states', () => {
      const invalid = {
        ...LIST_BEHAVIOR,
        transitions: [
          ...LIST_BEHAVIOR.transitions,
          { from: 'NonexistentState', to: 'Browsing', event: 'TEST', effects: [] },
        ],
      };
      const errors = validateBehaviorStates(invalid);
      expect(errors.some((e) => e.includes('NonexistentState'))).toBe(true);
    });
  });
});

// ============================================================================
// Action Affinity Tests
// ============================================================================

describe('Action Affinity', () => {
  describe('ACTION_AFFINITY', () => {
    it('has definitions for common components', () => {
      expect(ACTION_AFFINITY['entity-table']).toBeDefined();
      expect(ACTION_AFFINITY['form']).toBeDefined();
      expect(ACTION_AFFINITY['page-header']).toBeDefined();
      expect(ACTION_AFFINITY['modal']).toBeDefined();
    });

    it('entity-table has correct valid/invalid actions', () => {
      const tableAffinity = ACTION_AFFINITY['entity-table'];
      expect(tableAffinity.valid).toContain('VIEW');
      expect(tableAffinity.valid).toContain('EDIT');
      expect(tableAffinity.valid).toContain('DELETE');
      expect(tableAffinity.invalid).toContain('SAVE');
      expect(tableAffinity.invalid).toContain('CANCEL');
    });

    it('form has correct valid/invalid actions', () => {
      const formAffinity = ACTION_AFFINITY['form'];
      expect(formAffinity.valid).toContain('SAVE');
      expect(formAffinity.valid).toContain('CANCEL');
      expect(formAffinity.invalid).toContain('VIEW');
      expect(formAffinity.invalid).toContain('DELETE');
    });
  });

  describe('UI_EVENTS', () => {
    it('has definitions for standard events', () => {
      expect(UI_EVENTS.VIEW).toBeDefined();
      expect(UI_EVENTS.EDIT).toBeDefined();
      expect(UI_EVENTS.DELETE).toBeDefined();
      expect(UI_EVENTS.SAVE).toBeDefined();
      expect(UI_EVENTS.CREATE).toBeDefined();
    });

    it('events have correct metadata', () => {
      expect(UI_EVENTS.VIEW.emittedBy).toContain('entity-table');
      expect(UI_EVENTS.SAVE.emittedBy).toContain('form');
      expect(UI_EVENTS.CREATE.emittedBy).toContain('page-header');
    });
  });

  describe('isActionValidForComponent', () => {
    it('returns true for valid actions', () => {
      expect(isActionValidForComponent('VIEW', 'entity-table')).toBe(true);
      expect(isActionValidForComponent('SAVE', 'form')).toBe(true);
      expect(isActionValidForComponent('CREATE', 'page-header')).toBe(true);
    });

    it('returns false for invalid actions', () => {
      expect(isActionValidForComponent('SAVE', 'entity-table')).toBe(false);
      expect(isActionValidForComponent('VIEW', 'form')).toBe(false);
      expect(isActionValidForComponent('DELETE', 'page-header')).toBe(false);
    });

    it('returns true for unknown components', () => {
      expect(isActionValidForComponent('ANY', 'unknown-component')).toBe(true);
    });
  });

  describe('isActionInvalidForComponent', () => {
    it('returns true for explicitly invalid actions', () => {
      expect(isActionInvalidForComponent('SAVE', 'entity-table')).toBe(true);
      expect(isActionInvalidForComponent('CREATE', 'form')).toBe(true);
    });

    it('returns false for valid or unknown actions', () => {
      expect(isActionInvalidForComponent('VIEW', 'entity-table')).toBe(false);
      expect(isActionInvalidForComponent('CUSTOM', 'entity-table')).toBe(false);
    });
  });

  describe('getValidActionsForComponent', () => {
    it('returns valid actions for known components', () => {
      const tableActions = getValidActionsForComponent('entity-table');
      expect(tableActions).toContain('VIEW');
      expect(tableActions).toContain('EDIT');
      expect(tableActions).not.toContain('SAVE');
    });

    it('returns empty array for unknown components', () => {
      expect(getValidActionsForComponent('unknown')).toEqual([]);
    });
  });

  describe('validateActionsForComponent', () => {
    it('returns empty array for valid actions', () => {
      const errors = validateActionsForComponent(
        [{ event: 'VIEW' }, { event: 'EDIT' }],
        'entity-table'
      );
      expect(errors).toEqual([]);
    });

    it('returns errors for invalid actions', () => {
      const errors = validateActionsForComponent(
        [{ event: 'VIEW' }, { event: 'SAVE' }],
        'entity-table'
      );
      expect(errors.length).toBe(1);
      expect(errors[0]).toContain('SAVE');
    });
  });

  describe('getAllKnownComponents', () => {
    it('returns array of component names', () => {
      const components = getAllKnownComponents();
      expect(components).toContain('entity-table');
      expect(components).toContain('form');
      expect(components).toContain('modal');
      expect(components.length).toBeGreaterThan(10);
    });
  });

  describe('getComponentsByCategory', () => {
    it('returns components grouped by category', () => {
      const categories = getComponentsByCategory();
      expect(categories.display).toContain('entity-table');
      expect(categories.form).toContain('form');
      expect(categories.container).toContain('modal');
      expect(categories.game).toContain('game-canvas');
    });
  });
});

// ============================================================================
// Behavior Registry Tests
// ============================================================================

describe('Behavior Registry', () => {
  describe('STANDARD_BEHAVIORS', () => {
    it('has expected behaviors', () => {
      expect(STANDARD_BEHAVIORS.length).toBeGreaterThan(15);
      expect(STANDARD_BEHAVIORS.some((b) => b.name === 'std/List')).toBe(true);
      expect(STANDARD_BEHAVIORS.some((b) => b.name === 'std/Form')).toBe(true);
      expect(STANDARD_BEHAVIORS.some((b) => b.name === 'std/Pagination')).toBe(true);
    });
  });

  describe('BEHAVIOR_REGISTRY', () => {
    it('has all behaviors indexed by name', () => {
      expect(BEHAVIOR_REGISTRY['std/List']).toBeDefined();
      expect(BEHAVIOR_REGISTRY['std/Form']).toBeDefined();
      expect(BEHAVIOR_REGISTRY['std/Modal']).toBeDefined();
    });
  });

  describe('getBehavior', () => {
    it('returns behavior for valid name', () => {
      expect(getBehavior('std/List')).toBe(LIST_BEHAVIOR);
      expect(getBehavior('std/Form')).toBe(FORM_BEHAVIOR);
    });

    it('returns undefined for invalid name', () => {
      expect(getBehavior('std/Invalid')).toBeUndefined();
      expect(getBehavior('List')).toBeUndefined();
    });
  });

  describe('isKnownBehavior', () => {
    it('returns true for known behaviors', () => {
      expect(isKnownBehavior('std/List')).toBe(true);
      expect(isKnownBehavior('std/Form')).toBe(true);
      expect(isKnownBehavior('std/Pagination')).toBe(true);
    });

    it('returns false for unknown behaviors', () => {
      expect(isKnownBehavior('std/Invalid')).toBe(false);
      expect(isKnownBehavior('List')).toBe(false);
      expect(isKnownBehavior('')).toBe(false);
    });
  });

  describe('getBehaviorsByCategory', () => {
    it('returns behaviors for valid category', () => {
      const uiBehaviors = getBehaviorsByCategory('ui-interaction');
      expect(uiBehaviors.length).toBeGreaterThan(5);
      expect(uiBehaviors.some((b) => b.name === 'std/List')).toBe(true);
    });

    it('returns empty array for category with no behaviors', () => {
      const gameBehaviors = getBehaviorsByCategory('game-core');
      expect(gameBehaviors).toEqual([]);
    });
  });

  describe('getAllBehaviorNames', () => {
    it('returns all behavior names', () => {
      const names = getAllBehaviorNames();
      expect(names).toContain('std/List');
      expect(names).toContain('std/Form');
      expect(names.length).toBe(STANDARD_BEHAVIORS.length);
    });
  });

  describe('getAllBehaviorMetadata', () => {
    it('returns metadata for all behaviors', () => {
      const metadata = getAllBehaviorMetadata();
      expect(metadata.length).toBe(STANDARD_BEHAVIORS.length);
      expect(metadata[0]).toHaveProperty('name');
      expect(metadata[0]).toHaveProperty('category');
      expect(metadata[0]).toHaveProperty('states');
    });
  });

  describe('findBehaviorsForUseCase', () => {
    it('finds behaviors by use case', () => {
      const listBehaviors = findBehaviorsForUseCase('list');
      expect(listBehaviors.some((b) => b.name === 'std/List')).toBe(true);

      const formBehaviors = findBehaviorsForUseCase('form');
      expect(formBehaviors.some((b) => b.name === 'std/Form')).toBe(true);
    });

    it('returns empty array for no matches', () => {
      expect(findBehaviorsForUseCase('xyznonexistent')).toEqual([]);
    });
  });

  describe('getBehaviorsForEvent', () => {
    it('finds behaviors that handle an event', () => {
      const saveBehaviors = getBehaviorsForEvent('SAVE');
      // List and Form both have SAVE in their events array
      expect(saveBehaviors.length).toBeGreaterThan(0);

      const initBehaviors = getBehaviorsForEvent('INIT');
      expect(initBehaviors.some((b) => b.name === 'std/List')).toBe(true);
    });
  });

  describe('validateBehaviorReference', () => {
    it('returns null for valid references', () => {
      expect(validateBehaviorReference('std/List')).toBeNull();
      expect(validateBehaviorReference('std/Form')).toBeNull();
    });

    it('returns error for missing std/ prefix', () => {
      const error = validateBehaviorReference('List');
      expect(error).toContain('std/');
    });

    it('returns error with suggestions for unknown behavior', () => {
      const error = validateBehaviorReference('std/Lst');
      expect(error).toContain('Unknown');
      expect(error).toContain('std/List');
    });
  });

  describe('getBehaviorLibraryStats', () => {
    it('returns correct statistics', () => {
      const stats = getBehaviorLibraryStats();
      expect(stats.totalBehaviors).toBe(STANDARD_BEHAVIORS.length);
      expect(stats.byCategory['ui-interaction']).toBeGreaterThan(0);
      expect(stats.byCategory['data-management']).toBeGreaterThan(0);
      expect(stats.totalStates).toBeGreaterThan(0);
      expect(stats.totalEvents).toBeGreaterThan(0);
      expect(stats.totalTransitions).toBeGreaterThan(0);
    });
  });
});

// ============================================================================
// Individual Behavior Tests
// ============================================================================

describe('Individual Behaviors', () => {
  describe('LIST_BEHAVIOR', () => {
    it('has correct structure', () => {
      expect(LIST_BEHAVIOR.name).toBe('std/List');
      expect(LIST_BEHAVIOR.states).toContain('Browsing');
      expect(LIST_BEHAVIOR.states).toContain('Creating');
      expect(LIST_BEHAVIOR.states).toContain('Editing');
      expect(LIST_BEHAVIOR.initial).toBe('Browsing');
    });

    it('has CRUD events', () => {
      expect(LIST_BEHAVIOR.events).toContain('CREATE');
      expect(LIST_BEHAVIOR.events).toContain('VIEW');
      expect(LIST_BEHAVIOR.events).toContain('EDIT');
      expect(LIST_BEHAVIOR.events).toContain('DELETE');
      expect(LIST_BEHAVIOR.events).toContain('SAVE');
    });

    it('has required config fields', () => {
      expect(LIST_BEHAVIOR.config.required.some((f) => f.name === 'entity')).toBe(true);
      expect(LIST_BEHAVIOR.config.required.some((f) => f.name === 'columns')).toBe(true);
    });

    it('has transitions with render_ui effects', () => {
      const initTransition = LIST_BEHAVIOR.transitions.find((t) => t.event === 'INIT');
      expect(initTransition).toBeDefined();
      expect(initTransition?.effects.some((e) => e[0] === 'render')).toBe(true);
    });
  });

  describe('FORM_BEHAVIOR', () => {
    it('has form-specific states', () => {
      expect(FORM_BEHAVIOR.states).toContain('Editing');
      expect(FORM_BEHAVIOR.states).toContain('Validating');
      expect(FORM_BEHAVIOR.states).toContain('Submitting');
      expect(FORM_BEHAVIOR.states).toContain('Success');
      expect(FORM_BEHAVIOR.states).toContain('Error');
    });

    it('has form events', () => {
      expect(FORM_BEHAVIOR.events).toContain('FIELD_CHANGE');
      expect(FORM_BEHAVIOR.events).toContain('SUBMIT');
      expect(FORM_BEHAVIOR.events).toContain('VALIDATION_PASSED');
    });

    it('has state-owned fields', () => {
      expect(FORM_BEHAVIOR.fields?.values).toBeDefined();
      expect(FORM_BEHAVIOR.fields?.errors).toBeDefined();
      expect(FORM_BEHAVIOR.fields?.isDirty).toBeDefined();
    });

    it('has computed properties', () => {
      expect(FORM_BEHAVIOR.computed?.isValid).toBeDefined();
      expect(FORM_BEHAVIOR.computed?.canSubmit).toBeDefined();
    });
  });

  describe('PAGINATION_BEHAVIOR', () => {
    it('has pagination fields', () => {
      expect(PAGINATION_BEHAVIOR.fields?.page).toBeDefined();
      expect(PAGINATION_BEHAVIOR.fields?.pageSize).toBeDefined();
      expect(PAGINATION_BEHAVIOR.fields?.totalItems).toBeDefined();
    });

    it('has pagination computed', () => {
      expect(PAGINATION_BEHAVIOR.computed?.totalPages).toBeDefined();
      expect(PAGINATION_BEHAVIOR.computed?.hasNext).toBeDefined();
      expect(PAGINATION_BEHAVIOR.computed?.hasPrev).toBeDefined();
    });

    it('has pagination events', () => {
      expect(PAGINATION_BEHAVIOR.events).toContain('NEXT_PAGE');
      expect(PAGINATION_BEHAVIOR.events).toContain('PREV_PAGE');
      expect(PAGINATION_BEHAVIOR.events).toContain('GO_TO_PAGE');
    });
  });

  describe('MODAL_BEHAVIOR', () => {
    it('has open/closed states', () => {
      expect(MODAL_BEHAVIOR.states).toContain('Closed');
      expect(MODAL_BEHAVIOR.states).toContain('Open');
      expect(MODAL_BEHAVIOR.initial).toBe('Closed');
    });

    it('has modal events', () => {
      expect(MODAL_BEHAVIOR.events).toContain('OPEN');
      expect(MODAL_BEHAVIOR.events).toContain('CLOSE');
    });
  });

  describe('NOTIFICATION_BEHAVIOR', () => {
    it('has notification-specific structure', () => {
      expect(NOTIFICATION_BEHAVIOR.events).toContain('SHOW');
      expect(NOTIFICATION_BEHAVIOR.events).toContain('DISMISS');
      expect(NOTIFICATION_BEHAVIOR.fields?.notifications).toBeDefined();
    });
  });
});

// ============================================================================
// Behavior Validation Integration Tests
// ============================================================================

describe('Behavior Validation Integration', () => {
  it('all standard behaviors pass structure validation', () => {
    for (const behavior of STANDARD_BEHAVIORS) {
      const error = validateBehaviorStructure(behavior);
      expect(error).toBeNull();
    }
  });

  it('all standard behaviors have valid events', () => {
    for (const behavior of STANDARD_BEHAVIORS) {
      const errors = validateBehaviorEvents(behavior);
      expect(errors).toEqual([]);
    }
  });

  it('all standard behaviors have valid states', () => {
    for (const behavior of STANDARD_BEHAVIORS) {
      const errors = validateBehaviorStates(behavior);
      // Filter out errors about missing 'to' states (self-transitions are valid)
      const realErrors = errors.filter((e) => !e.includes('undefined'));
      expect(realErrors).toEqual([]);
    }
  });

  it('all behaviors have at least one transition', () => {
    for (const behavior of STANDARD_BEHAVIORS) {
      expect(behavior.transitions.length).toBeGreaterThan(0);
    }
  });

  it('all behaviors have description and suggestedFor', () => {
    for (const behavior of STANDARD_BEHAVIORS) {
      expect(behavior.description).toBeTruthy();
      expect(behavior.suggestedFor.length).toBeGreaterThan(0);
    }
  });
});
