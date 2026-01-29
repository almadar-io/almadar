/**
 * UI Interaction Behaviors
 *
 * Standard behaviors for common UI interaction patterns.
 * These use the Trait architecture with stateMachine.
 *
 * IMPORTANT: These are GENERATION TEMPLATES for LLMs.
 * They must use correct syntax:
 * - render-ui (not render)
 * - Explicit from states (not '*')
 * - Valid pattern types (form-section, entity-detail, etc.)
 *
 * @packageDocumentation
 */

import type { StandardBehavior } from './types.js';

// ============================================================================
// std/List - Entity List Management
// ============================================================================

/**
 * std/List - The core behavior for displaying and interacting with entity collections.
 *
 * States: Browsing → Creating/Viewing/Editing/Deleting
 * Implements complete CRUD operations with modal/drawer UI patterns.
 */
export const LIST_BEHAVIOR: StandardBehavior = {
  name: 'std/List',
  category: 'ui-interaction',
  description: 'Entity list management with CRUD operations',
  suggestedFor: [
    'Entity listing pages',
    'Admin panels',
    'Data management screens',
    'Table views with inline actions',
  ],

  dataEntities: [
    {
      name: 'ListState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'selectedId', type: 'string', default: null },
      ],
    },
  ],

  stateMachine: {
    initial: 'Browsing',
    states: [
      { name: 'Browsing', isInitial: true },
      { name: 'Creating' },
      { name: 'Viewing' },
      { name: 'Editing' },
      { name: 'Deleting' },
    ],
    events: [
      { key: 'INIT' },
      { key: 'CREATE' },
      { key: 'VIEW' },
      { key: 'EDIT' },
      { key: 'DELETE' },
      { key: 'CONFIRM_DELETE' },
      { key: 'CANCEL' },
      { key: 'SAVE' },
    ],
    transitions: [
      // INIT: Self-loop on Browsing that renders the list UI
      {
        from: 'Browsing',
        to: 'Browsing',
        event: 'INIT',
        effects: [
          ['render-ui', 'main', {
            type: 'page-header',
            title: '@config.title',
            actions: [{ label: 'Create', event: 'CREATE', variant: 'primary' }],
          }],
          ['render-ui', 'main', {
            type: 'entity-table',
            entity: '@config.entity',
            columns: '@config.columns',
            itemActions: [
              { label: 'View', event: 'VIEW', placement: 'row' },
              { label: 'Edit', event: 'EDIT', placement: 'row' },
              { label: 'Delete', event: 'DELETE', variant: 'danger', placement: 'row' },
            ],
          }],
        ],
      },
      {
        from: 'Browsing',
        to: 'Creating',
        event: 'CREATE',
        effects: [
          ['render-ui', 'modal', {
            type: 'form-section',
            entity: '@config.entity',
            mode: 'create',
            submitEvent: 'SAVE',
            cancelEvent: 'CANCEL',
          }],
        ],
      },
      {
        from: 'Browsing',
        to: 'Viewing',
        event: 'VIEW',
        effects: [
          ['set', '@entity.selectedId', '@payload.id'],
          ['render-ui', 'drawer', {
            type: 'entity-detail',
            entity: '@config.entity',
            id: '@payload.id',
            actions: [
              { label: 'Edit', event: 'EDIT' },
              { label: 'Close', event: 'CANCEL' },
            ],
          }],
        ],
      },
      {
        from: 'Browsing',
        to: 'Editing',
        event: 'EDIT',
        effects: [
          ['set', '@entity.selectedId', '@payload.id'],
          ['render-ui', 'drawer', {
            type: 'form-section',
            entity: '@config.entity',
            id: '@payload.id',
            mode: 'edit',
            submitEvent: 'SAVE',
            cancelEvent: 'CANCEL',
          }],
        ],
      },
      {
        from: 'Viewing',
        to: 'Editing',
        event: 'EDIT',
        effects: [
          ['render-ui', 'drawer', {
            type: 'form-section',
            entity: '@config.entity',
            id: '@entity.selectedId',
            mode: 'edit',
            submitEvent: 'SAVE',
            cancelEvent: 'CANCEL',
          }],
        ],
      },
      {
        from: 'Browsing',
        to: 'Deleting',
        event: 'DELETE',
        effects: [
          ['set', '@entity.selectedId', '@payload.id'],
          ['render-ui', 'modal', {
            type: 'confirmation',
            title: 'Delete Confirmation',
            message: 'Are you sure you want to delete this item?',
            confirmLabel: 'Delete',
            confirmVariant: 'danger',
          }],
        ],
      },
      {
        from: 'Creating',
        to: 'Browsing',
        event: 'SAVE',
        effects: [
          ['persist', 'create', '@config.entity', '@payload.data'],
          ['render-ui', 'modal', null],
          ['notify', { type: 'success', message: 'Created successfully' }],
          ['emit', 'INIT'],
        ],
      },
      {
        from: 'Editing',
        to: 'Browsing',
        event: 'SAVE',
        effects: [
          ['persist', 'update', '@config.entity', '@payload.data'],
          ['render-ui', 'drawer', null],
          ['notify', { type: 'success', message: 'Updated successfully' }],
          ['emit', 'INIT'],
        ],
      },
      {
        from: 'Deleting',
        to: 'Browsing',
        event: 'CONFIRM_DELETE',
        effects: [
          ['persist', 'delete', '@config.entity', '@entity.selectedId'],
          ['render-ui', 'modal', null],
          ['notify', { type: 'success', message: 'Deleted successfully' }],
          ['emit', 'INIT'],
        ],
      },
      {
        from: 'Creating',
        to: 'Browsing',
        event: 'CANCEL',
        effects: [
          ['render-ui', 'modal', null],
        ],
      },
      {
        from: 'Viewing',
        to: 'Browsing',
        event: 'CANCEL',
        effects: [
          ['render-ui', 'drawer', null],
        ],
      },
      {
        from: 'Editing',
        to: 'Browsing',
        event: 'CANCEL',
        effects: [
          ['render-ui', 'drawer', null],
        ],
      },
      {
        from: 'Deleting',
        to: 'Browsing',
        event: 'CANCEL',
        effects: [
          ['render-ui', 'modal', null],
        ],
      },
    ],
  },

  configSchema: {
    required: [
      { name: 'entity', type: 'entity', description: 'Entity type to list' },
      { name: 'columns', type: 'array', description: 'Fields to display as columns' },
    ],
    optional: [
      { name: 'title', type: 'string', description: 'Page title', default: '' },
      { name: 'display', type: 'string', description: 'Display mode', default: 'table', enum: ['table', 'cards', 'list'] },
      { name: 'actions', type: 'action[]', description: 'Available actions', default: ['view', 'edit', 'delete'] },
      { name: 'createInModal', type: 'boolean', description: 'Show create form in modal', default: true },
      { name: 'editInDrawer', type: 'boolean', description: 'Show edit form in drawer', default: true },
    ],
  },
};

// ============================================================================
// std/Detail - Single Entity View
// ============================================================================

export const DETAIL_BEHAVIOR: StandardBehavior = {
  name: 'std/Detail',
  category: 'ui-interaction',
  description: 'Single entity view with edit/delete capabilities',
  suggestedFor: [
    'Entity detail pages',
    'Profile views',
    'Settings pages',
    'Single record screens',
  ],

  dataEntities: [
    {
      name: 'DetailState',
      runtime: true,
      fields: [
        { name: 'entityId', type: 'string', default: null },
        { name: 'isLoading', type: 'boolean', default: false },
        { name: 'hasChanges', type: 'boolean', default: false },
      ],
    },
  ],

  stateMachine: {
    initial: 'Viewing',
    states: [
      { name: 'Viewing', isInitial: true },
      { name: 'Editing' },
      { name: 'Deleting' },
    ],
    events: [
      { key: 'INIT' },
      { key: 'EDIT' },
      { key: 'SAVE' },
      { key: 'CANCEL' },
      { key: 'DELETE' },
      { key: 'CONFIRM_DELETE' },
    ],
    transitions: [
      // INIT: Self-loop on Viewing
      {
        from: 'Viewing',
        to: 'Viewing',
        event: 'INIT',
        effects: [
          ['render-ui', 'main', {
            type: 'page-header',
            title: '@entity.name',
            actions: [
              { label: 'Edit', event: 'EDIT' },
              { label: 'Delete', event: 'DELETE', variant: 'danger' },
            ],
          }],
          ['render-ui', 'main', {
            type: 'entity-detail',
            entity: '@config.entity',
            fieldNames: '@config.fields',
          }],
        ],
      },
      {
        from: 'Viewing',
        to: 'Editing',
        event: 'EDIT',
        effects: [
          ['render-ui', 'main', {
            type: 'form-section',
            entity: '@config.entity',
            mode: 'edit',
            fields: '@config.fields',
            submitEvent: 'SAVE',
            cancelEvent: 'CANCEL',
          }],
        ],
      },
      {
        from: 'Editing',
        to: 'Viewing',
        event: 'SAVE',
        effects: [
          ['persist', 'update', '@config.entity', '@payload.data'],
          ['notify', { type: 'success', message: 'Updated successfully' }],
          ['emit', 'INIT'],
        ],
      },
      {
        from: 'Editing',
        to: 'Viewing',
        event: 'CANCEL',
        effects: [
          ['emit', 'INIT'],
        ],
      },
      {
        from: 'Viewing',
        to: 'Deleting',
        event: 'DELETE',
        effects: [
          ['render-ui', 'modal', {
            type: 'confirmation',
            title: 'Delete Confirmation',
            message: 'Are you sure you want to delete this item?',
          }],
        ],
      },
      {
        from: 'Deleting',
        to: 'Viewing',
        event: 'CONFIRM_DELETE',
        effects: [
          ['persist', 'delete', '@config.entity', '@entity.id'],
          ['navigate', '@config.returnUrl'],
        ],
      },
      {
        from: 'Deleting',
        to: 'Viewing',
        event: 'CANCEL',
        effects: [
          ['render-ui', 'modal', null],
        ],
      },
    ],
  },

  configSchema: {
    required: [
      { name: 'entity', type: 'entity', description: 'Entity type' },
      { name: 'fields', type: 'array', description: 'Fields to display' },
    ],
    optional: [
      { name: 'layout', type: 'string', description: 'Layout mode', default: 'two-column', enum: ['single-column', 'two-column', 'grid'] },
      { name: 'allowEdit', type: 'boolean', description: 'Allow editing', default: true },
      { name: 'allowDelete', type: 'boolean', description: 'Allow deletion', default: true },
    ],
  },
};

// ============================================================================
// std/Form - Form State Management
// ============================================================================

export const FORM_BEHAVIOR: StandardBehavior = {
  name: 'std/Form',
  category: 'ui-interaction',
  description: 'Form state management with validation and submission',
  suggestedFor: [
    'Create/edit forms',
    'Settings forms',
    'Multi-field input',
    'Validated data entry',
  ],

  dataEntities: [
    {
      name: 'FormState',
      runtime: true,
      fields: [
        { name: 'values', type: 'object', default: {} },
        { name: 'errors', type: 'object', default: {} },
        { name: 'touched', type: 'object', default: {} },
        { name: 'isDirty', type: 'boolean', default: false },
        { name: 'isSubmitting', type: 'boolean', default: false },
      ],
    },
  ],

  stateMachine: {
    initial: 'Idle',
    states: [
      { name: 'Idle', isInitial: true },
      { name: 'Editing' },
      { name: 'Validating' },
      { name: 'Submitting' },
      { name: 'Success' },
      { name: 'Error' },
    ],
    events: [
      { key: 'INIT' },
      { key: 'FIELD_CHANGE' },
      { key: 'FIELD_BLUR' },
      { key: 'SUBMIT' },
      { key: 'VALIDATION_PASSED' },
      { key: 'VALIDATION_FAILED' },
      { key: 'SUBMIT_SUCCESS' },
      { key: 'SUBMIT_ERROR' },
      { key: 'RESET' },
    ],
    transitions: [
      // INIT: Self-loop on Idle → Editing
      {
        from: 'Idle',
        to: 'Editing',
        event: 'INIT',
        effects: [
          ['render-ui', 'main', {
            type: 'form-section',
            entity: '@config.entity',
            fields: '@config.fields',
            values: '@entity.values',
            errors: '@entity.errors',
            submitEvent: 'SUBMIT',
            cancelEvent: '@config.cancelEvent',
          }],
        ],
      },
      {
        from: 'Editing',
        to: 'Editing',
        event: 'FIELD_CHANGE',
        effects: [
          ['set', '@entity.values', ['object/set', '@entity.values', '@payload.field', '@payload.value']],
          ['set', '@entity.isDirty', true],
        ],
      },
      {
        from: 'Editing',
        to: 'Editing',
        event: 'FIELD_BLUR',
        effects: [
          ['set', '@entity.touched', ['object/set', '@entity.touched', '@payload.field', true]],
        ],
      },
      {
        from: 'Editing',
        to: 'Validating',
        event: 'SUBMIT',
        effects: [
          ['let', [['result', ['validate/check', '@entity.values', '@config.validation']]],
            ['if', '@result.valid',
              ['emit', 'VALIDATION_PASSED'],
              ['do',
                ['set', '@entity.errors', '@result.errors'],
                ['emit', 'VALIDATION_FAILED']]]],
        ],
      },
      {
        from: 'Validating',
        to: 'Submitting',
        event: 'VALIDATION_PASSED',
        effects: [
          ['set', '@entity.isSubmitting', true],
          ['if', ['=', '@config.mode', 'create'],
            ['persist', 'create', '@config.entity', '@entity.values'],
            ['persist', 'update', '@config.entity', '@entity.values']],
        ],
      },
      {
        from: 'Validating',
        to: 'Editing',
        event: 'VALIDATION_FAILED',
        effects: [
          ['notify', { type: 'error', message: 'Please fix the validation errors' }],
        ],
      },
      {
        from: 'Submitting',
        to: 'Success',
        event: 'SUBMIT_SUCCESS',
        effects: [
          ['set', '@entity.isSubmitting', false],
          ['notify', { type: 'success', message: 'Saved successfully' }],
          ['emit', '@config.submitEvent', { data: '@entity.values' }],
        ],
      },
      {
        from: 'Submitting',
        to: 'Error',
        event: 'SUBMIT_ERROR',
        effects: [
          ['set', '@entity.isSubmitting', false],
          ['set', '@entity.errors', { _form: '@payload.error' }],
          ['notify', { type: 'error', message: '@payload.error' }],
        ],
      },
      {
        from: 'Editing',
        to: 'Idle',
        event: 'RESET',
        effects: [
          ['set', '@entity.values', {}],
          ['set', '@entity.errors', {}],
          ['set', '@entity.touched', {}],
          ['set', '@entity.isDirty', false],
        ],
      },
      {
        from: 'Error',
        to: 'Idle',
        event: 'RESET',
        effects: [
          ['set', '@entity.values', {}],
          ['set', '@entity.errors', {}],
          ['set', '@entity.touched', {}],
          ['set', '@entity.isDirty', false],
        ],
      },
    ],
  },

  configSchema: {
    required: [
      { name: 'entity', type: 'entity', description: 'Entity type' },
      { name: 'fields', type: 'array', description: 'Form fields' },
    ],
    optional: [
      { name: 'mode', type: 'string', description: 'Form mode', default: 'create', enum: ['create', 'edit'] },
      { name: 'validation', type: 'object', description: 'Validation rules', default: {} },
      { name: 'submitEvent', type: 'event', description: 'Event to emit on successful submit', default: 'SAVE' },
      { name: 'cancelEvent', type: 'event', description: 'Event to emit on cancel', default: 'CANCEL' },
    ],
  },
};

// ============================================================================
// std/Modal - Modal Dialog
// ============================================================================

export const MODAL_BEHAVIOR: StandardBehavior = {
  name: 'std/Modal',
  category: 'ui-interaction',
  description: 'Modal dialog with open/close state management',
  suggestedFor: [
    'Confirmation dialogs',
    'Create forms',
    'Detail views',
    'Any overlay content',
  ],

  dataEntities: [
    {
      name: 'ModalState',
      runtime: true,
      fields: [
        { name: 'content', type: 'object', default: null },
      ],
    },
  ],

  stateMachine: {
    initial: 'Closed',
    states: [
      { name: 'Closed', isInitial: true },
      { name: 'Open' },
    ],
    events: [
      { key: 'OPEN' },
      { key: 'CLOSE' },
      { key: 'CONFIRM' },
    ],
    transitions: [
      {
        from: 'Closed',
        to: 'Open',
        event: 'OPEN',
        effects: [
          ['set', '@entity.content', '@payload.content'],
          ['render-ui', 'modal', {
            type: '@payload.type',
            onClose: 'CLOSE',
          }],
        ],
      },
      {
        from: 'Open',
        to: 'Closed',
        event: 'CLOSE',
        effects: [
          ['render-ui', 'modal', null],
        ],
      },
      {
        from: 'Open',
        to: 'Closed',
        event: 'CONFIRM',
        effects: [
          ['render-ui', 'modal', null],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'size', type: 'string', description: 'Modal size', default: 'md', enum: ['sm', 'md', 'lg', 'xl', 'full'] },
      { name: 'closeOnOverlay', type: 'boolean', description: 'Close on overlay click', default: true },
      { name: 'closeOnEscape', type: 'boolean', description: 'Close on escape key', default: true },
    ],
  },
};

// ============================================================================
// std/Drawer - Side Drawer Panel
// ============================================================================

export const DRAWER_BEHAVIOR: StandardBehavior = {
  name: 'std/Drawer',
  category: 'ui-interaction',
  description: 'Side drawer panel for detail views and forms',
  suggestedFor: [
    'Detail panels',
    'Edit forms',
    'Property panels',
    'Side navigation',
  ],

  dataEntities: [
    {
      name: 'DrawerState',
      runtime: true,
      fields: [
        { name: 'content', type: 'object', default: null },
      ],
    },
  ],

  stateMachine: {
    initial: 'Closed',
    states: [
      { name: 'Closed', isInitial: true },
      { name: 'Open' },
    ],
    events: [
      { key: 'OPEN' },
      { key: 'CLOSE' },
    ],
    transitions: [
      {
        from: 'Closed',
        to: 'Open',
        event: 'OPEN',
        effects: [
          ['set', '@entity.content', '@payload.content'],
          ['render-ui', 'drawer', {
            type: '@payload.type',
            onClose: 'CLOSE',
          }],
        ],
      },
      {
        from: 'Open',
        to: 'Closed',
        event: 'CLOSE',
        effects: [
          ['render-ui', 'drawer', null],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'position', type: 'string', description: 'Drawer position', default: 'right', enum: ['left', 'right'] },
      { name: 'size', type: 'string', description: 'Drawer size', default: 'md', enum: ['sm', 'md', 'lg'] },
      { name: 'overlay', type: 'boolean', description: 'Show overlay', default: true },
    ],
  },
};

// ============================================================================
// std/Tabs - Tabbed Navigation
// ============================================================================

export const TABS_BEHAVIOR: StandardBehavior = {
  name: 'std/Tabs',
  category: 'ui-interaction',
  description: 'Tabbed navigation within a page',
  suggestedFor: [
    'Multi-view pages',
    'Settings with sections',
    'Dashboard tabs',
    'Profile sections',
  ],

  dataEntities: [
    {
      name: 'TabsState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'activeTab', type: 'string', default: null },
      ],
    },
  ],

  stateMachine: {
    initial: 'Active',
    states: [
      { name: 'Active', isInitial: true },
    ],
    events: [
      { key: 'INIT' },
      { key: 'SELECT_TAB' },
    ],
    transitions: [
      // INIT: Self-loop on Active
      {
        from: 'Active',
        to: 'Active',
        event: 'INIT',
        effects: [
          ['set', '@entity.activeTab', '@config.defaultTab'],
          ['render-ui', 'main', {
            type: 'filter-group',
            filterType: 'tabs',
            tabs: '@config.tabs',
            active: '@entity.activeTab',
            onSelect: 'SELECT_TAB',
          }],
        ],
      },
      {
        from: 'Active',
        to: 'Active',
        event: 'SELECT_TAB',
        effects: [
          ['set', '@entity.activeTab', '@payload.tabId'],
        ],
      },
    ],
  },

  configSchema: {
    required: [
      { name: 'tabs', type: 'array', description: 'Tab definitions with id, label, content' },
    ],
    optional: [
      { name: 'defaultTab', type: 'string', description: 'Default active tab ID' },
    ],
  },
};

// ============================================================================
// std/Wizard - Multi-Step Flow
// IMPORTANT: Each step is a STATE, not an index number
// ============================================================================

export const WIZARD_BEHAVIOR: StandardBehavior = {
  name: 'std/Wizard',
  category: 'ui-interaction',
  description: 'Multi-step wizard flow - each step is a state',
  suggestedFor: [
    'Onboarding flows',
    'Multi-step forms',
    'Setup wizards',
    'Checkout flows',
  ],

  dataEntities: [
    {
      name: 'WizardState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'stepData', type: 'object', default: {} },
      ],
    },
  ],

  // IMPORTANT: Each wizard step is a STATE, not a number index
  // This is the correct pattern for wizards
  stateMachine: {
    initial: 'Step1',
    states: [
      { name: 'Step1', isInitial: true },
      { name: 'Step2' },
      { name: 'Step3' },
      { name: 'Complete' },
    ],
    events: [
      { key: 'INIT' },
      { key: 'NEXT' },
      { key: 'PREV' },
      { key: 'COMPLETE' },
    ],
    transitions: [
      // INIT on Step1: Self-loop that renders step 1
      {
        from: 'Step1',
        to: 'Step1',
        event: 'INIT',
        effects: [
          ['render-ui', 'main', {
            type: 'wizard-progress',
            steps: ['Step 1', 'Step 2', 'Step 3'],
            current: 0,
          }],
          ['render-ui', 'main', {
            type: 'form-section',
            entity: '@config.entity',
            fields: '@config.step1Fields',
            submitEvent: 'NEXT',
          }],
        ],
      },
      // Step1 → Step2
      {
        from: 'Step1',
        to: 'Step2',
        event: 'NEXT',
        effects: [
          ['set', '@entity.stepData.step1', '@payload'],
          ['render-ui', 'main', {
            type: 'wizard-progress',
            steps: ['Step 1', 'Step 2', 'Step 3'],
            current: 1,
          }],
          ['render-ui', 'main', {
            type: 'form-section',
            entity: '@config.entity',
            fields: '@config.step2Fields',
            submitEvent: 'NEXT',
            cancelEvent: 'PREV',
          }],
        ],
      },
      // Step2 → Step1 (back)
      {
        from: 'Step2',
        to: 'Step1',
        event: 'PREV',
        effects: [
          ['emit', 'INIT'],
        ],
      },
      // Step2 → Step3
      {
        from: 'Step2',
        to: 'Step3',
        event: 'NEXT',
        effects: [
          ['set', '@entity.stepData.step2', '@payload'],
          ['render-ui', 'main', {
            type: 'wizard-progress',
            steps: ['Step 1', 'Step 2', 'Step 3'],
            current: 2,
          }],
          ['render-ui', 'main', {
            type: 'entity-detail',
            entity: '@config.entity',
            fieldNames: ['step1', 'step2'],
            title: 'Review',
          }],
          ['render-ui', 'main', {
            type: 'form-section',
            submitLabel: 'Complete',
            cancelLabel: 'Back',
            submitEvent: 'COMPLETE',
            cancelEvent: 'PREV',
          }],
        ],
      },
      // Step3 → Step2 (back)
      {
        from: 'Step3',
        to: 'Step2',
        event: 'PREV',
        effects: [
          ['render-ui', 'main', {
            type: 'wizard-progress',
            steps: ['Step 1', 'Step 2', 'Step 3'],
            current: 1,
          }],
          ['render-ui', 'main', {
            type: 'form-section',
            entity: '@config.entity',
            fields: '@config.step2Fields',
            submitEvent: 'NEXT',
            cancelEvent: 'PREV',
          }],
        ],
      },
      // Step3 → Complete
      {
        from: 'Step3',
        to: 'Complete',
        event: 'COMPLETE',
        effects: [
          ['persist', 'create', '@config.entity', '@entity.stepData'],
          ['notify', { type: 'success', message: 'Wizard completed!' }],
          ['navigate', '@config.completionUrl'],
        ],
      },
    ],
  },

  configSchema: {
    required: [
      { name: 'entity', type: 'entity', description: 'Entity to create' },
      { name: 'step1Fields', type: 'array', description: 'Fields for step 1' },
      { name: 'step2Fields', type: 'array', description: 'Fields for step 2' },
    ],
    optional: [
      { name: 'completionUrl', type: 'string', description: 'URL to navigate on completion', default: '/' },
    ],
  },
};

// ============================================================================
// std/MasterDetail - List + Detail Layout
// ============================================================================

export const MASTER_DETAIL_BEHAVIOR: StandardBehavior = {
  name: 'std/MasterDetail',
  category: 'ui-interaction',
  description: 'Master-detail layout with synchronized list and detail views',
  suggestedFor: [
    'Email clients',
    'File managers',
    'Two-panel layouts',
    'List-detail views',
  ],

  dataEntities: [
    {
      name: 'MasterDetailState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'selectedId', type: 'string', default: null },
      ],
    },
  ],

  stateMachine: {
    initial: 'NoSelection',
    states: [
      { name: 'NoSelection', isInitial: true },
      { name: 'Selected' },
    ],
    events: [
      { key: 'INIT' },
      { key: 'SELECT' },
      { key: 'DESELECT' },
    ],
    transitions: [
      // INIT: Self-loop on NoSelection
      {
        from: 'NoSelection',
        to: 'NoSelection',
        event: 'INIT',
        effects: [
          ['render-ui', 'main', {
            type: 'master-detail',
            entity: '@config.entity',
            masterColumns: '@config.masterColumns',
            onSelect: 'SELECT',
            selected: '@entity.selectedId',
          }],
          ['render-ui', 'main', {
            type: 'empty-state',
            message: 'Select an item to view details',
          }],
        ],
      },
      {
        from: 'NoSelection',
        to: 'Selected',
        event: 'SELECT',
        effects: [
          ['set', '@entity.selectedId', '@payload.id'],
          ['render-ui', 'main', {
            type: 'entity-detail',
            entity: '@config.entity',
            id: '@payload.id',
            fieldNames: '@config.detailFields',
          }],
        ],
      },
      {
        from: 'Selected',
        to: 'Selected',
        event: 'SELECT',
        effects: [
          ['set', '@entity.selectedId', '@payload.id'],
          ['render-ui', 'main', {
            type: 'entity-detail',
            entity: '@config.entity',
            id: '@payload.id',
            fieldNames: '@config.detailFields',
          }],
        ],
      },
      {
        from: 'Selected',
        to: 'NoSelection',
        event: 'DESELECT',
        effects: [
          ['set', '@entity.selectedId', null],
          ['render-ui', 'main', {
            type: 'empty-state',
            message: 'Select an item to view details',
          }],
        ],
      },
    ],
  },

  configSchema: {
    required: [
      { name: 'entity', type: 'entity', description: 'Entity type' },
      { name: 'masterColumns', type: 'array', description: 'Columns for master list' },
      { name: 'detailFields', type: 'array', description: 'Fields for detail panel' },
    ],
    optional: [
      { name: 'masterWidth', type: 'string', description: 'Master panel width', default: '350px' },
    ],
  },
};

// ============================================================================
// std/Filter - Filter Management
// ============================================================================

export const FILTER_BEHAVIOR: StandardBehavior = {
  name: 'std/Filter',
  category: 'ui-interaction',
  description: 'Filter and search management for lists',
  suggestedFor: [
    'Filtered lists',
    'Search interfaces',
    'Faceted navigation',
    'Advanced filtering',
  ],

  dataEntities: [
    {
      name: 'FilterState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'filters', type: 'object', default: {} },
        { name: 'searchTerm', type: 'string', default: '' },
      ],
    },
  ],

  stateMachine: {
    initial: 'Idle',
    states: [
      { name: 'Idle', isInitial: true },
      { name: 'Filtering' },
    ],
    events: [
      { key: 'INIT' },
      { key: 'SET_FILTER' },
      { key: 'CLEAR_FILTERS' },
      { key: 'SEARCH' },
    ],
    transitions: [
      // INIT: Self-loop
      {
        from: 'Idle',
        to: 'Idle',
        event: 'INIT',
        effects: [
          ['render-ui', 'main', {
            type: 'filter-group',
            filters: '@config.filters',
            values: '@entity.filters',
            onFilterChange: 'SET_FILTER',
            onClear: 'CLEAR_FILTERS',
          }],
        ],
      },
      {
        from: 'Idle',
        to: 'Filtering',
        event: 'SET_FILTER',
        effects: [
          ['set', '@entity.filters', ['object/set', '@entity.filters', '@payload.field', '@payload.value']],
          ['emit', 'FILTER_CHANGED', '@entity.filters'],
        ],
      },
      {
        from: 'Filtering',
        to: 'Idle',
        event: 'SET_FILTER',
        effects: [
          ['set', '@entity.filters', ['object/set', '@entity.filters', '@payload.field', '@payload.value']],
          ['emit', 'FILTER_CHANGED', '@entity.filters'],
        ],
      },
      {
        from: 'Filtering',
        to: 'Idle',
        event: 'CLEAR_FILTERS',
        effects: [
          ['set', '@entity.filters', {}],
          ['set', '@entity.searchTerm', ''],
          ['emit', 'FILTER_CHANGED', {}],
        ],
      },
      {
        from: 'Idle',
        to: 'Filtering',
        event: 'SEARCH',
        effects: [
          ['set', '@entity.searchTerm', '@payload.term'],
          ['emit', 'SEARCH_CHANGED', '@payload.term'],
        ],
      },
    ],
  },

  configSchema: {
    required: [
      { name: 'filters', type: 'array', description: 'Filter definitions' },
    ],
    optional: [
      { name: 'searchable', type: 'boolean', description: 'Enable search', default: true },
    ],
  },
};

// ============================================================================
// Export All Behaviors
// ============================================================================

export const UI_INTERACTION_BEHAVIORS: StandardBehavior[] = [
  LIST_BEHAVIOR,
  DETAIL_BEHAVIOR,
  FORM_BEHAVIOR,
  MODAL_BEHAVIOR,
  DRAWER_BEHAVIOR,
  TABS_BEHAVIOR,
  WIZARD_BEHAVIOR,
  MASTER_DETAIL_BEHAVIOR,
  FILTER_BEHAVIOR,
];
