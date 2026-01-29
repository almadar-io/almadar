/**
 * Action-Component Affinity Rules
 *
 * Defines which actions are valid on which components in the Closed Circuit pattern.
 * This enforces that behaviors only emit actions that make sense for their component context.
 *
 * The Closed Circuit pattern:
 * Behavior → render_ui → Component → User Action → Event Bus → Behavior
 *
 * @packageDocumentation
 */

// ============================================================================
// Action Affinity Types
// ============================================================================

/**
 * Action affinity definition for a component
 */
export interface ActionAffinity {
  /** Actions that are valid on this component */
  valid: string[];
  /** Actions that should NEVER appear on this component */
  invalid: string[];
}

/**
 * Action placement options
 */
export type ActionPlacement = 'row' | 'bulk' | 'card' | 'footer' | 'header';

/**
 * Event naming convention for UI events
 */
export interface UIEventInfo {
  /** Event name (without UI: prefix) */
  event: string;
  /** Components that typically emit this event */
  emittedBy: string[];
  /** Expected payload shape */
  payload: Record<string, string>;
  /** Description of when this event is used */
  description: string;
}

// ============================================================================
// Action-Component Affinity Matrix
// ============================================================================

/**
 * The action-component affinity matrix.
 * This defines which actions belong on which components.
 *
 * CRITICAL: Not all actions belong on all components.
 * The Closed Circuit pattern requires that actions match their component context.
 */
export const ACTION_AFFINITY: Record<string, ActionAffinity> = {
  // Display components - view data and trigger navigation/editing
  'entity-table': {
    valid: ['VIEW', 'EDIT', 'DELETE', 'SELECT', 'SORT', 'PAGE'],
    invalid: ['SAVE', 'CANCEL', 'SUBMIT', 'CREATE', 'CLOSE'],
  },
  'entity-list': {
    valid: ['VIEW', 'EDIT', 'DELETE', 'SELECT'],
    invalid: ['SAVE', 'CANCEL', 'SUBMIT', 'CREATE', 'CLOSE'],
  },
  'entity-cards': {
    valid: ['VIEW', 'EDIT', 'DELETE', 'SELECT'],
    invalid: ['SAVE', 'CANCEL', 'SUBMIT', 'CREATE', 'CLOSE'],
  },
  'card-grid': {
    valid: ['VIEW', 'EDIT', 'DELETE', 'SELECT'],
    invalid: ['SAVE', 'CANCEL', 'SUBMIT', 'CREATE', 'CLOSE'],
  },

  // Header components - page-level actions
  'page-header': {
    valid: ['CREATE', 'REFRESH', 'EXPORT', 'IMPORT', 'BACK', 'FILTER'],
    invalid: ['SAVE', 'VIEW', 'EDIT', 'DELETE', 'SUBMIT'],
  },

  // Form components - data entry and submission
  'form': {
    valid: ['SAVE', 'CANCEL', 'SUBMIT', 'CLOSE', 'RESET', 'FIELD_CHANGE', 'FIELD_BLUR'],
    invalid: ['VIEW', 'DELETE', 'CREATE', 'SELECT', 'EDIT'],
  },
  'form-section': {
    valid: ['FIELD_CHANGE', 'FIELD_BLUR'],
    invalid: ['SAVE', 'VIEW', 'DELETE', 'CREATE', 'SELECT', 'EDIT'],
  },
  'form-actions': {
    valid: ['SAVE', 'CANCEL', 'SUBMIT', 'RESET'],
    invalid: ['VIEW', 'DELETE', 'CREATE', 'SELECT', 'EDIT'],
  },

  // Detail components - view single entity with edit/delete options
  'detail-panel': {
    valid: ['EDIT', 'DELETE', 'CLOSE', 'BACK'],
    invalid: ['SAVE', 'CREATE', 'SELECT', 'SUBMIT'],
  },
  'entity-detail': {
    valid: ['EDIT', 'DELETE', 'CLOSE', 'BACK'],
    invalid: ['SAVE', 'CREATE', 'SELECT', 'SUBMIT'],
  },

  // Container components - open/close states
  'modal': {
    valid: ['CLOSE', 'CONFIRM', 'CANCEL'],
    invalid: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
  },
  'modal-container': {
    valid: ['CLOSE', 'CONFIRM', 'CANCEL'],
    invalid: ['VIEW', 'CREATE', 'EDIT', 'DELETE'],
  },
  'drawer': {
    valid: ['CLOSE'],
    invalid: ['VIEW', 'CREATE', 'DELETE'],
  },

  // Navigation components
  'tabs': {
    valid: ['SELECT_TAB'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },
  'tab-bar': {
    valid: ['SELECT_TAB'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },
  'wizard-navigation': {
    valid: ['NEXT', 'PREV', 'GO_TO', 'COMPLETE'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },
  'wizard-progress': {
    valid: ['GO_TO'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT', 'NEXT', 'PREV'],
  },

  // Filter components
  'filter-group': {
    valid: ['SET_FILTER', 'CLEAR_FILTER', 'CLEAR_ALL'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },
  'search-bar': {
    valid: ['SEARCH', 'CLEAR_SEARCH'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },
  'search-input': {
    valid: ['SEARCH', 'CLEAR_SEARCH'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },

  // Pagination components
  'pagination': {
    valid: ['NEXT_PAGE', 'PREV_PAGE', 'GO_TO_PAGE', 'SET_PAGE_SIZE'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },

  // Confirmation components
  'confirm-dialog': {
    valid: ['CONFIRM', 'CANCEL'],
    invalid: ['VIEW', 'CREATE', 'EDIT', 'DELETE', 'SAVE'],
  },

  // Empty/Loading states - no actions
  'empty-state': {
    valid: ['CREATE'], // Often has a "Create first item" CTA
    invalid: ['SAVE', 'VIEW', 'EDIT', 'DELETE', 'CANCEL'],
  },
  'loading-state': {
    valid: [],
    invalid: ['SAVE', 'VIEW', 'EDIT', 'DELETE', 'CREATE', 'CANCEL'],
  },

  // Stats/Dashboard - view only
  'stats': {
    valid: [],
    invalid: ['SAVE', 'VIEW', 'EDIT', 'DELETE', 'CREATE', 'CANCEL'],
  },

  // Game components
  'game-canvas': {
    valid: ['INPUT', 'PAUSE', 'UNPAUSE'],
    invalid: ['SAVE', 'CREATE', 'DELETE'],
  },
  'game-hud': {
    valid: ['PAUSE'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },
  'game-controls': {
    valid: ['INPUT', 'ACTION'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },
  'game-menu': {
    valid: ['START', 'OPTIONS', 'QUIT', 'SELECT'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },
  'game-pause-overlay': {
    valid: ['RESUME', 'QUIT', 'OPTIONS'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },
  'game-over-screen': {
    valid: ['RETRY', 'QUIT', 'MAIN_MENU'],
    invalid: ['SAVE', 'CREATE', 'DELETE', 'VIEW', 'EDIT'],
  },
};

// ============================================================================
// UI Event Definitions
// ============================================================================

/**
 * Standard UI events and their metadata
 */
export const UI_EVENTS: Record<string, UIEventInfo> = {
  VIEW: {
    event: 'VIEW',
    emittedBy: ['entity-table', 'entity-list', 'entity-cards', 'card-grid'],
    payload: { row: 'object', entity: 'string' },
    description: 'View item detail',
  },
  EDIT: {
    event: 'EDIT',
    emittedBy: ['entity-table', 'entity-list', 'entity-cards', 'detail-panel'],
    payload: { row: 'object', entity: 'string' },
    description: 'Edit item',
  },
  DELETE: {
    event: 'DELETE',
    emittedBy: ['entity-table', 'entity-list', 'entity-cards', 'detail-panel'],
    payload: { row: 'object', entity: 'string' },
    description: 'Delete item',
  },
  CREATE: {
    event: 'CREATE',
    emittedBy: ['page-header', 'empty-state'],
    payload: { entity: 'string' },
    description: 'Create new item',
  },
  SAVE: {
    event: 'SAVE',
    emittedBy: ['form', 'form-actions'],
    payload: { data: 'object', entity: 'string' },
    description: 'Save form data',
  },
  CANCEL: {
    event: 'CANCEL',
    emittedBy: ['form', 'form-actions', 'modal', 'confirm-dialog'],
    payload: {},
    description: 'Cancel form/modal',
  },
  CLOSE: {
    event: 'CLOSE',
    emittedBy: ['modal', 'drawer', 'detail-panel'],
    payload: {},
    description: 'Close modal/drawer',
  },
  SELECT: {
    event: 'SELECT',
    emittedBy: ['entity-table', 'entity-list', 'entity-cards'],
    payload: { selectedIds: 'string[]' },
    description: 'Selection change',
  },
  SEARCH: {
    event: 'SEARCH',
    emittedBy: ['search-bar', 'search-input'],
    payload: { searchTerm: 'string' },
    description: 'Search filter',
  },
  CONFIRM: {
    event: 'CONFIRM',
    emittedBy: ['modal', 'confirm-dialog'],
    payload: {},
    description: 'Confirm action',
  },
  SELECT_TAB: {
    event: 'SELECT_TAB',
    emittedBy: ['tabs', 'tab-bar'],
    payload: { tabId: 'string' },
    description: 'Tab selection',
  },
  NEXT: {
    event: 'NEXT',
    emittedBy: ['wizard-navigation'],
    payload: {},
    description: 'Wizard next step',
  },
  PREV: {
    event: 'PREV',
    emittedBy: ['wizard-navigation'],
    payload: {},
    description: 'Wizard previous step',
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if an action is valid for a component
 */
export function isActionValidForComponent(action: string, component: string): boolean {
  const affinity = ACTION_AFFINITY[component];
  if (!affinity) {
    // Unknown component - allow by default but warn
    return true;
  }
  return affinity.valid.includes(action) || !affinity.invalid.includes(action);
}

/**
 * Check if an action is explicitly invalid for a component
 */
export function isActionInvalidForComponent(action: string, component: string): boolean {
  const affinity = ACTION_AFFINITY[component];
  if (!affinity) {
    return false;
  }
  return affinity.invalid.includes(action);
}

/**
 * Get valid actions for a component
 */
export function getValidActionsForComponent(component: string): string[] {
  const affinity = ACTION_AFFINITY[component];
  return affinity?.valid ?? [];
}

/**
 * Get invalid actions for a component
 */
export function getInvalidActionsForComponent(component: string): string[] {
  const affinity = ACTION_AFFINITY[component];
  return affinity?.invalid ?? [];
}

/**
 * Get components that can emit a specific event
 */
export function getComponentsForEvent(event: string): string[] {
  return UI_EVENTS[event]?.emittedBy ?? [];
}

/**
 * Validate that a set of item actions are appropriate for a component
 *
 * @returns Array of validation errors (empty if valid)
 */
export function validateActionsForComponent(
  actions: Array<{ event?: string; label?: string }>,
  component: string
): string[] {
  const errors: string[] = [];
  const affinity = ACTION_AFFINITY[component];

  if (!affinity) {
    // Unknown component - no validation
    return errors;
  }

  for (const action of actions) {
    if (action.event && affinity.invalid.includes(action.event)) {
      errors.push(
        `Action "${action.event}" is not valid on "${component}". ` +
          `Valid actions: ${affinity.valid.join(', ')}`
      );
    }
  }

  return errors;
}

/**
 * Get all known components in the affinity matrix
 */
export function getAllKnownComponents(): string[] {
  return Object.keys(ACTION_AFFINITY);
}

/**
 * Get all components by category
 */
export function getComponentsByCategory(): Record<string, string[]> {
  return {
    display: ['entity-table', 'entity-list', 'entity-cards', 'card-grid'],
    header: ['page-header'],
    form: ['form', 'form-section', 'form-actions'],
    detail: ['detail-panel', 'entity-detail'],
    container: ['modal', 'modal-container', 'drawer'],
    navigation: ['tabs', 'tab-bar', 'wizard-navigation', 'wizard-progress'],
    filter: ['filter-group', 'search-bar', 'search-input'],
    pagination: ['pagination'],
    confirmation: ['confirm-dialog'],
    state: ['empty-state', 'loading-state'],
    dashboard: ['stats'],
    game: [
      'game-canvas',
      'game-hud',
      'game-controls',
      'game-menu',
      'game-pause-overlay',
      'game-over-screen',
    ],
  };
}
