/**
 * Standard Behaviors Types
 *
 * Standard Behaviors are reusable Traits with a `std/` naming convention.
 * They use a more flexible state machine format optimized for authoring.
 *
 * ARCHITECTURE: Behaviors ARE Traits conceptually. They use:
 * - stateMachine: BehaviorStateMachine (flexible states, events, transitions)
 * - ticks: BehaviorTick[] (frame-by-frame execution for games)
 * - dataEntities: BehaviorDataEntity[] (runtime state)
 *
 * @packageDocumentation
 */

import type { SExpr } from '../../types/expression.js';
import type { RequiredField } from '../../types/trait.js';

// ============================================================================
// Behavior Categories
// ============================================================================

/**
 * Categories of Standard Behaviors
 */
export const BEHAVIOR_CATEGORIES = [
  'ui-interaction',   // User interface state management
  'data-management',  // Data operations and state
  'async',            // Asynchronous workflows
  'feedback',         // User feedback and confirmations
  'game-core',        // Game loop and systems
  'game-entity',      // Game entity behaviors
  'game-ui',          // Game interface
] as const;

export type BehaviorCategory = (typeof BEHAVIOR_CATEGORIES)[number];

// ============================================================================
// Config Field Types (for IDE hints and documentation)
// ============================================================================

export type FieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'entity'
  | 'slot'
  | 'pattern'
  | 'event'
  | 'action[]';

export interface ConfigField {
  name: string;
  type: FieldType;
  description: string;
  default?: unknown;
  enum?: string[];
}

// ============================================================================
// Behavior State Machine Types (flexible for authoring)
// ============================================================================

/**
 * State definition - can be string or object
 */
export interface BehaviorState {
  name: string;
  isInitial?: boolean;
  isFinal?: boolean;
  description?: string;
}

/**
 * Event definition - simplified, only key required
 */
export interface BehaviorEvent {
  key: string;
  name?: string;
  description?: string;
  payload?: Record<string, unknown>;
}

/**
 * Transition definition - flexible from/to
 */
export interface BehaviorTransition {
  /** Source state(s) - string, '*' for any, or array */
  from?: string | string[] | '*';
  /** Target state - optional for self-transitions */
  to?: string;
  /** Event that triggers this transition */
  event: string;
  /** Guard condition (S-expression) */
  guard?: SExpr;
  /** Effects to execute (S-expressions) */
  effects?: SExpr[];
}

/**
 * State machine for behaviors - more flexible than core StateMachine
 */
export interface BehaviorStateMachine {
  initial: string;
  states: (string | BehaviorState)[];
  events: (string | BehaviorEvent)[];
  transitions: BehaviorTransition[];
  guards?: Array<{
    name: string;
    condition: SExpr;
    description?: string;
  }>;
}

// ============================================================================
// Behavior Tick (for frame-by-frame execution)
// ============================================================================

export interface BehaviorTick {
  name: string;
  description?: string;
  priority?: number;
  interval: 'frame' | number;
  appliesTo?: string[];
  guard?: SExpr;
  effects: SExpr[];
}

// ============================================================================
// Behavior Data Entity (runtime state)
// ============================================================================

export interface BehaviorEntityField {
  name: string;
  type: string;
  default?: unknown;
  required?: boolean;
  description?: string;
}

export interface BehaviorDataEntity {
  name: string;
  runtime?: boolean;
  singleton?: boolean;
  fields: BehaviorEntityField[];
  description?: string;
}

// ============================================================================
// Item Action (for render_ui props)
// ============================================================================

export interface ItemAction {
  label: string;
  event?: string;
  navigatesTo?: string;
  placement?: 'row' | 'bulk' | 'card' | 'footer' | 'header';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  showWhen?: SExpr | string;
}

// ============================================================================
// Standard Behavior Interface
// ============================================================================

/**
 * Configuration schema for documentation and IDE hints
 */
export interface BehaviorConfig {
  required: ConfigField[];
  optional: ConfigField[];
}

/**
 * Standard Behavior definition
 */
export interface StandardBehavior {
  /** Behavior identifier (e.g., 'std/List', 'std/Form') */
  name: string;

  /** Category for organization */
  category: BehaviorCategory;

  /** Human-readable description */
  description: string;

  // ========== Documentation Extensions ==========

  /** When to use this behavior */
  suggestedFor?: string[];

  /** Configuration schema for IDE hints */
  configSchema?: BehaviorConfig;

  // ========== State Machine ==========

  /** State machine definition */
  stateMachine?: BehaviorStateMachine;

  // ========== Trait Features ==========

  /** Required fields from linked entity */
  requiredFields?: RequiredField[];

  /** Runtime data entities */
  dataEntities?: BehaviorDataEntity[];

  /** Frame-by-frame execution */
  ticks?: BehaviorTick[];

  /** Cross-behavior event listeners */
  listens?: Array<{
    event: string;
    triggers: string;
    guard?: SExpr;
  }>;

  /** Initial effects on behavior activation */
  initialEffects?: SExpr[];
}

/**
 * Behavior metadata for quick lookup
 */
export interface BehaviorMetadata {
  name: string;
  category: BehaviorCategory;
  description: string;
  suggestedFor: string[];
  states: string[];
  events: string[];
  tickCount: number;
  transitionCount: number;
  hasDataEntities: boolean;
}

// ============================================================================
// Helper Functions
// ============================================================================

export function isBehaviorCategory(value: string): value is BehaviorCategory {
  return BEHAVIOR_CATEGORIES.includes(value as BehaviorCategory);
}

export function isGameBehaviorCategory(category: BehaviorCategory): boolean {
  return category.startsWith('game-');
}

/**
 * Extract metadata from a StandardBehavior
 */
export function getBehaviorMetadata(behavior: StandardBehavior): BehaviorMetadata {
  const sm = behavior.stateMachine;

  const states: string[] = (sm?.states || []).map(s =>
    typeof s === 'string' ? s : s.name
  );

  const events: string[] = (sm?.events || []).map(e =>
    typeof e === 'string' ? e : e.key
  );

  return {
    name: behavior.name,
    category: behavior.category,
    description: behavior.description || '',
    suggestedFor: behavior.suggestedFor || [],
    states,
    events,
    tickCount: behavior.ticks?.length || 0,
    transitionCount: sm?.transitions?.length || 0,
    hasDataEntities: (behavior.dataEntities?.length || 0) > 0,
  };
}

/**
 * Validate behavior structure
 */
export function validateBehaviorStructure(behavior: StandardBehavior): string[] {
  const errors: string[] = [];

  if (!behavior.name) {
    errors.push('Behavior must have a name');
  }

  if (!behavior.name.startsWith('std/')) {
    errors.push(`Behavior name should start with 'std/' (got: ${behavior.name})`);
  }

  if (!behavior.category) {
    errors.push('Behavior must have a category');
  }

  if (!isBehaviorCategory(behavior.category)) {
    errors.push(`Invalid category: ${behavior.category}`);
  }

  const sm = behavior.stateMachine;
  if (sm) {
    if (!sm.states || sm.states.length === 0) {
      errors.push('State machine must have at least one state');
    }

    if (!sm.initial) {
      errors.push('State machine must have an initial state');
    }
  }

  return errors;
}

/**
 * Validate behavior events match transitions
 */
export function validateBehaviorEvents(behavior: StandardBehavior): string[] {
  const errors: string[] = [];
  const sm = behavior.stateMachine;
  if (!sm) return errors;

  const declaredEvents = new Set(
    (sm.events || []).map(e => typeof e === 'string' ? e : e.key)
  );

  const transitionEvents = new Set(
    (sm.transitions || []).map(t => t.event)
  );

  for (const event of transitionEvents) {
    if (event && !declaredEvents.has(event)) {
      errors.push(`Transition uses undeclared event: ${event}`);
    }
  }

  return errors;
}

/**
 * Validate behavior states match transitions
 */
export function validateBehaviorStates(behavior: StandardBehavior): string[] {
  const errors: string[] = [];
  const sm = behavior.stateMachine;
  if (!sm) return errors;

  const declaredStates = new Set(
    (sm.states || []).map(s => typeof s === 'string' ? s : s.name)
  );

  for (const t of sm.transitions || []) {
    // Check 'from' states (allow '*' and arrays)
    if (t.from && t.from !== '*') {
      const fromStates = Array.isArray(t.from) ? t.from : [t.from];
      for (const state of fromStates) {
        if (!declaredStates.has(state)) {
          errors.push(`Transition from undeclared state: ${state}`);
        }
      }
    }

    // Check 'to' state (optional)
    if (t.to && !declaredStates.has(t.to)) {
      errors.push(`Transition to undeclared state: ${t.to}`);
    }
  }

  return errors;
}
