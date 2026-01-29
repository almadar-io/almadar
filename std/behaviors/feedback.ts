/**
 * Feedback Behaviors
 *
 * Standard behaviors for user feedback including notifications,
 * confirmations, and undo functionality.
 *
 * @packageDocumentation
 */

import type { StandardBehavior } from './types.js';

// ============================================================================
// std/Notification - Toast Notifications
// ============================================================================

export const NOTIFICATION_BEHAVIOR: StandardBehavior = {
  name: 'std/Notification',
  category: 'feedback',
  description: 'Toast notification with auto-dismiss',
  suggestedFor: [
    'Success messages',
    'Error alerts',
    'Status updates',
    'User feedback',
  ],

  dataEntities: [
    {
      name: 'NotificationState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'notifications', type: 'array', default: [] },
        { name: 'currentId', type: 'number', default: 0 },
      ],
    },
  ],

  stateMachine: {
    initial: 'Hidden',
    states: [
      { name: 'Hidden', isInitial: true },
      { name: 'Visible' },
      { name: 'Dismissing' },
    ],
    events: [
      { key: 'SHOW' },
      { key: 'HIDE' },
      { key: 'DISMISS' },
      { key: 'AUTO_DISMISS' },
    ],
    transitions: [
      {
        from: '*',
        event: 'SHOW',
        effects: [
          ['let', [['id', ['+', '@entity.currentId', 1]]],
            ['do',
              ['set', '@entity.currentId', '@id'],
              ['set', '@entity.notifications',
                ['array/append', '@entity.notifications', {
                  id: '@id',
                  type: '@payload.type',
                  message: '@payload.message',
                  title: '@payload.title',
                }]],
              ['when', ['>', '@config.autoDismissMs', 0],
                ['async/delay', '@config.autoDismissMs', ['emit', 'AUTO_DISMISS', { id: '@id' }]]]]],
        ],
      },
      {
        event: 'DISMISS',
        effects: [
          ['set', '@entity.notifications',
            ['array/filter', '@entity.notifications', ['fn', 'n', ['!=', '@n.id', '@payload.id']]]],
        ],
      },
      {
        event: 'AUTO_DISMISS',
        effects: [
          ['set', '@entity.notifications',
            ['array/filter', '@entity.notifications', ['fn', 'n', ['!=', '@n.id', '@payload.id']]]],
        ],
      },
      {
        event: 'HIDE',
        effects: [
          ['set', '@entity.notifications', []],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'autoDismissMs', type: 'number', description: 'Auto dismiss delay (0 = no auto)', default: 5000 },
      { name: 'position', type: 'string', description: 'Toast position', default: 'top-right', enum: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] },
      { name: 'maxVisible', type: 'number', description: 'Maximum visible notifications', default: 5 },
    ],
  },
};

// ============================================================================
// std/Confirmation - Confirmation Dialog
// ============================================================================

export const CONFIRMATION_BEHAVIOR: StandardBehavior = {
  name: 'std/Confirmation',
  category: 'feedback',
  description: 'Confirmation dialog with confirm/cancel actions',
  suggestedFor: [
    'Delete confirmation',
    'Destructive actions',
    'Important decisions',
    'Exit warnings',
  ],

  dataEntities: [
    {
      name: 'ConfirmationState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'title', type: 'string', default: '' },
        { name: 'message', type: 'string', default: '' },
        { name: 'pendingAction', type: 'object', default: null },
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
      { key: 'REQUEST' },
      { key: 'CONFIRM' },
      { key: 'CANCEL' },
    ],
    transitions: [
      {
        from: 'Closed',
        to: 'Open',
        event: 'REQUEST',
        effects: [
          ['set', '@entity.title', '@payload.title'],
          ['set', '@entity.message', '@payload.message'],
          ['set', '@entity.pendingAction', '@payload.onConfirm'],
          ['render-ui', 'modal', {
            type: 'confirmation',
            title: '@entity.title',
            message: '@entity.message',
            confirmLabel: '@config.confirmLabel',
            cancelLabel: '@config.cancelLabel',
            confirmVariant: '@config.confirmVariant',
          }],
        ],
      },
      {
        from: 'Open',
        to: 'Closed',
        event: 'CONFIRM',
        effects: [
          ['render-ui', 'modal', null],
          ['when', '@entity.pendingAction', ['emit', '@entity.pendingAction.event', '@entity.pendingAction.payload']],
          ['set', '@entity.pendingAction', null],
        ],
      },
      {
        from: 'Open',
        to: 'Closed',
        event: 'CANCEL',
        effects: [
          ['render-ui', 'modal', null],
          ['set', '@entity.pendingAction', null],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'confirmLabel', type: 'string', description: 'Confirm button label', default: 'Confirm' },
      { name: 'cancelLabel', type: 'string', description: 'Cancel button label', default: 'Cancel' },
      { name: 'confirmVariant', type: 'string', description: 'Confirm button variant', default: 'primary', enum: ['primary', 'danger', 'warning'] },
    ],
  },
};

// ============================================================================
// std/Undo - Undo Stack
// ============================================================================

export const UNDO_BEHAVIOR: StandardBehavior = {
  name: 'std/Undo',
  category: 'feedback',
  description: 'Undo/redo stack for reversible actions',
  suggestedFor: [
    'Document editing',
    'Form changes',
    'Canvas operations',
    'Reversible actions',
  ],

  dataEntities: [
    {
      name: 'UndoState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'undoStack', type: 'array', default: [] },
        { name: 'redoStack', type: 'array', default: [] },
      ],
    },
  ],

  stateMachine: {
    initial: 'Ready',
    states: [
      { name: 'Ready', isInitial: true },
    ],
    events: [
      { key: 'PUSH' },
      { key: 'UNDO' },
      { key: 'REDO' },
      { key: 'CLEAR' },
    ],
    transitions: [
      {
        event: 'PUSH',
        effects: [
          ['set', '@entity.undoStack',
            ['array/slice',
              ['array/prepend', '@entity.undoStack', {
                action: '@payload.action',
                data: '@payload.data',
                reverseAction: '@payload.reverseAction',
                reverseData: '@payload.reverseData',
                description: '@payload.description',
              }],
              0, '@config.maxHistory']],
          ['set', '@entity.redoStack', []],
          ['when', '@config.showToast',
            ['emit', 'NOTIFY', {
              type: 'info',
              message: ['str/concat', '@payload.description', ' - Click to undo'],
              action: { label: 'Undo', event: 'UNDO' },
            }]],
        ],
      },
      {
        event: 'UNDO',
        guard: ['>', ['array/len', '@entity.undoStack'], 0],
        effects: [
          ['let', [['action', ['array/first', '@entity.undoStack']]],
            ['do',
              ['set', '@entity.undoStack', ['array/slice', '@entity.undoStack', 1]],
              ['set', '@entity.redoStack', ['array/prepend', '@entity.redoStack', '@action']],
              ['emit', '@action.reverseAction', '@action.reverseData']]],
        ],
      },
      {
        event: 'REDO',
        guard: ['>', ['array/len', '@entity.redoStack'], 0],
        effects: [
          ['let', [['action', ['array/first', '@entity.redoStack']]],
            ['do',
              ['set', '@entity.redoStack', ['array/slice', '@entity.redoStack', 1]],
              ['set', '@entity.undoStack', ['array/prepend', '@entity.undoStack', '@action']],
              ['emit', '@action.action', '@action.data']]],
        ],
      },
      {
        event: 'CLEAR',
        effects: [
          ['set', '@entity.undoStack', []],
          ['set', '@entity.redoStack', []],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'maxHistory', type: 'number', description: 'Maximum undo history', default: 50 },
      { name: 'showToast', type: 'boolean', description: 'Show undo toast', default: true },
      { name: 'toastDurationMs', type: 'number', description: 'Toast display duration', default: 5000 },
    ],
  },
};

// ============================================================================
// Export All Feedback Behaviors
// ============================================================================

export const FEEDBACK_BEHAVIORS: StandardBehavior[] = [
  NOTIFICATION_BEHAVIOR,
  CONFIRMATION_BEHAVIOR,
  UNDO_BEHAVIOR,
];
