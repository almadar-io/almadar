/**
 * Async Behaviors
 *
 * Standard behaviors for asynchronous operations like loading,
 * fetching, submission, retry, and polling.
 *
 * @packageDocumentation
 */

import type { StandardBehavior } from './types.js';

// ============================================================================
// std/Loading - Loading State Management
// ============================================================================

export const LOADING_BEHAVIOR: StandardBehavior = {
  name: 'std/Loading',
  category: 'async',
  description: 'Loading state management with success/error handling',
  suggestedFor: [
    'Async data loading',
    'API calls',
    'Resource fetching',
    'Initial page load',
  ],

  dataEntities: [
    {
      name: 'LoadingState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'isLoading', type: 'boolean', default: false },
        { name: 'error', type: 'object', default: null },
        { name: 'data', type: 'object', default: null },
        { name: 'startTime', type: 'number', default: null },
      ],
    },
  ],

  stateMachine: {
    initial: 'Idle',
    states: [
      { name: 'Idle', isInitial: true },
      { name: 'Loading' },
      { name: 'Success' },
      { name: 'Error' },
    ],
    events: [
      { key: 'START' },
      { key: 'SUCCESS' },
      { key: 'ERROR' },
      { key: 'RETRY' },
      { key: 'RESET' },
    ],
    transitions: [
      {
        from: 'Idle',
        to: 'Loading',
        event: 'START',
        effects: [
          ['set', '@entity.isLoading', true],
          ['set', '@entity.error', null],
          ['set', '@entity.startTime', ['time/now']],
          ['render', 'content', 'loading-state', {}],
        ],
      },
      {
        from: 'Loading',
        to: 'Success',
        event: 'SUCCESS',
        effects: [
          ['set', '@entity.isLoading', false],
          ['set', '@entity.data', '@payload.data'],
        ],
      },
      {
        from: 'Loading',
        to: 'Error',
        event: 'ERROR',
        effects: [
          ['set', '@entity.isLoading', false],
          ['set', '@entity.error', '@payload.error'],
          ['render', 'content', 'error-state', {
            error: '@entity.error',
            onRetry: 'RETRY',
          }],
        ],
      },
      {
        from: 'Error',
        to: 'Loading',
        event: 'RETRY',
        effects: [
          ['set', '@entity.isLoading', true],
          ['set', '@entity.error', null],
          ['set', '@entity.startTime', ['time/now']],
          ['render', 'content', 'loading-state', {}],
        ],
      },
      {
        from: ['Success', 'Error'],
        to: 'Idle',
        event: 'RESET',
        effects: [
          ['set', '@entity.isLoading', false],
          ['set', '@entity.error', null],
          ['set', '@entity.data', null],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'showLoadingAfterMs', type: 'number', description: 'Delay before showing loading', default: 200 },
      { name: 'minLoadingMs', type: 'number', description: 'Minimum loading display time', default: 500 },
    ],
  },
};

// ============================================================================
// std/Fetch - Data Fetching
// ============================================================================

export const FETCH_BEHAVIOR: StandardBehavior = {
  name: 'std/Fetch',
  category: 'async',
  description: 'Data fetching with caching and refresh capabilities',
  suggestedFor: [
    'API data fetching',
    'Entity loading',
    'Remote data',
    'Cached queries',
  ],

  dataEntities: [
    {
      name: 'FetchState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'data', type: 'object', default: null },
        { name: 'error', type: 'object', default: null },
        { name: 'isFetching', type: 'boolean', default: false },
        { name: 'lastFetchedAt', type: 'number', default: null },
      ],
    },
  ],

  stateMachine: {
    initial: 'Idle',
    states: [
      { name: 'Idle', isInitial: true },
      { name: 'Fetching' },
      { name: 'Stale' },
      { name: 'Fresh' },
      { name: 'Error' },
    ],
    events: [
      { key: 'FETCH' },
      { key: 'FETCH_SUCCESS' },
      { key: 'FETCH_ERROR' },
      { key: 'REFRESH' },
      { key: 'INVALIDATE' },
    ],
    transitions: [
      {
        from: ['Idle', 'Stale'],
        to: 'Fetching',
        event: 'FETCH',
        effects: [
          ['set', '@entity.isFetching', true],
          ['set', '@entity.error', null],
        ],
      },
      {
        from: 'Fetching',
        to: 'Fresh',
        event: 'FETCH_SUCCESS',
        effects: [
          ['set', '@entity.isFetching', false],
          ['set', '@entity.data', '@payload.data'],
          ['set', '@entity.lastFetchedAt', ['time/now']],
        ],
      },
      {
        from: 'Fetching',
        to: 'Error',
        event: 'FETCH_ERROR',
        effects: [
          ['set', '@entity.isFetching', false],
          ['set', '@entity.error', '@payload.error'],
        ],
      },
      {
        from: 'Fresh',
        to: 'Stale',
        event: 'INVALIDATE',
        effects: [
          ['set', '@entity.lastFetchedAt', null],
        ],
      },
      {
        from: ['Fresh', 'Stale', 'Error'],
        to: 'Fetching',
        event: 'REFRESH',
        effects: [
          ['set', '@entity.isFetching', true],
          ['set', '@entity.error', null],
        ],
      },
    ],
  },

  configSchema: {
    required: [
      { name: 'entity', type: 'entity', description: 'Entity type to fetch' },
    ],
    optional: [
      { name: 'staleTimeMs', type: 'number', description: 'Time until data is stale', default: 60000 },
      { name: 'cacheKey', type: 'string', description: 'Cache key for deduplication' },
    ],
  },
};

// ============================================================================
// std/Submit - Form Submission
// ============================================================================

export const SUBMIT_BEHAVIOR: StandardBehavior = {
  name: 'std/Submit',
  category: 'async',
  description: 'Async submission with retry capabilities',
  suggestedFor: [
    'Form submission',
    'Data saving',
    'API mutations',
    'Actions with confirmation',
  ],

  dataEntities: [
    {
      name: 'SubmitState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'isSubmitting', type: 'boolean', default: false },
        { name: 'error', type: 'object', default: null },
        { name: 'lastSubmittedData', type: 'object', default: null },
      ],
    },
  ],

  stateMachine: {
    initial: 'Idle',
    states: [
      { name: 'Idle', isInitial: true },
      { name: 'Submitting' },
      { name: 'Success' },
      { name: 'Error' },
    ],
    events: [
      { key: 'SUBMIT' },
      { key: 'SUBMIT_SUCCESS' },
      { key: 'SUBMIT_ERROR' },
      { key: 'RETRY' },
      { key: 'RESET' },
    ],
    transitions: [
      {
        from: 'Idle',
        to: 'Submitting',
        event: 'SUBMIT',
        effects: [
          ['set', '@entity.isSubmitting', true],
          ['set', '@entity.error', null],
          ['set', '@entity.lastSubmittedData', '@payload.data'],
        ],
      },
      {
        from: 'Submitting',
        to: 'Success',
        event: 'SUBMIT_SUCCESS',
        effects: [
          ['set', '@entity.isSubmitting', false],
          ['notify', { type: 'success', message: '@config.successMessage' }],
          ['when', '@config.resetOnSuccess', ['emit', 'RESET']],
        ],
      },
      {
        from: 'Submitting',
        to: 'Error',
        event: 'SUBMIT_ERROR',
        effects: [
          ['set', '@entity.isSubmitting', false],
          ['set', '@entity.error', '@payload.error'],
          ['notify', { type: 'error', message: '@config.errorMessage' }],
        ],
      },
      {
        from: 'Error',
        to: 'Submitting',
        event: 'RETRY',
        effects: [
          ['set', '@entity.isSubmitting', true],
          ['set', '@entity.error', null],
        ],
      },
      {
        from: ['Success', 'Error'],
        to: 'Idle',
        event: 'RESET',
        effects: [
          ['set', '@entity.isSubmitting', false],
          ['set', '@entity.error', null],
          ['set', '@entity.lastSubmittedData', null],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'successMessage', type: 'string', description: 'Success notification', default: 'Saved successfully' },
      { name: 'errorMessage', type: 'string', description: 'Error notification', default: 'Failed to save' },
      { name: 'resetOnSuccess', type: 'boolean', description: 'Reset to idle on success', default: false },
    ],
  },
};

// ============================================================================
// std/Retry - Automatic Retry
// ============================================================================

export const RETRY_BEHAVIOR: StandardBehavior = {
  name: 'std/Retry',
  category: 'async',
  description: 'Automatic retry with exponential backoff',
  suggestedFor: [
    'Network requests',
    'Unreliable operations',
    'Transient failures',
    'Recovery logic',
  ],

  dataEntities: [
    {
      name: 'RetryState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'attempt', type: 'number', default: 0 },
        { name: 'error', type: 'object', default: null },
        { name: 'nextRetryAt', type: 'number', default: null },
      ],
    },
  ],

  stateMachine: {
    initial: 'Idle',
    states: [
      { name: 'Idle', isInitial: true },
      { name: 'Attempting' },
      { name: 'Waiting' },
      { name: 'Success' },
      { name: 'Failed' },
    ],
    events: [
      { key: 'START' },
      { key: 'ATTEMPT_SUCCESS' },
      { key: 'ATTEMPT_ERROR' },
      { key: 'RETRY_TICK' },
      { key: 'GIVE_UP' },
      { key: 'RESET' },
    ],
    transitions: [
      {
        from: 'Idle',
        to: 'Attempting',
        event: 'START',
        effects: [
          ['set', '@entity.attempt', 1],
          ['set', '@entity.error', null],
        ],
      },
      {
        from: 'Attempting',
        to: 'Success',
        event: 'ATTEMPT_SUCCESS',
        effects: [],
      },
      {
        from: 'Attempting',
        to: 'Waiting',
        event: 'ATTEMPT_ERROR',
        guard: ['<', '@entity.attempt', '@config.maxAttempts'],
        effects: [
          ['set', '@entity.error', '@payload.error'],
          ['let', [['delay', ['math/min',
            ['*', '@config.initialDelayMs', ['math/pow', '@config.backoffMultiplier', '@entity.attempt']],
            '@config.maxDelayMs']]],
            ['set', '@entity.nextRetryAt', ['+', ['time/now'], '@delay']],
            ['async/delay', '@delay', ['emit', 'RETRY_TICK']]],
        ],
      },
      {
        from: 'Attempting',
        to: 'Failed',
        event: 'ATTEMPT_ERROR',
        guard: ['>=', '@entity.attempt', '@config.maxAttempts'],
        effects: [
          ['set', '@entity.error', '@payload.error'],
          ['notify', { type: 'error', message: 'All retry attempts failed' }],
        ],
      },
      {
        from: 'Waiting',
        to: 'Attempting',
        event: 'RETRY_TICK',
        effects: [
          ['set', '@entity.attempt', ['+', '@entity.attempt', 1]],
        ],
      },
      {
        from: 'Waiting',
        to: 'Failed',
        event: 'GIVE_UP',
        effects: [
          ['notify', { type: 'warning', message: 'Retry cancelled' }],
        ],
      },
      {
        from: ['Success', 'Failed'],
        to: 'Idle',
        event: 'RESET',
        effects: [
          ['set', '@entity.attempt', 0],
          ['set', '@entity.error', null],
          ['set', '@entity.nextRetryAt', null],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'maxAttempts', type: 'number', description: 'Maximum retry attempts', default: 3 },
      { name: 'initialDelayMs', type: 'number', description: 'Initial retry delay', default: 1000 },
      { name: 'maxDelayMs', type: 'number', description: 'Maximum retry delay', default: 30000 },
      { name: 'backoffMultiplier', type: 'number', description: 'Backoff multiplier', default: 2 },
    ],
  },
};

// ============================================================================
// std/Poll - Periodic Polling
// ============================================================================

export const POLL_BEHAVIOR: StandardBehavior = {
  name: 'std/Poll',
  category: 'async',
  description: 'Periodic polling with start/stop control',
  suggestedFor: [
    'Real-time updates',
    'Status checking',
    'Live data',
    'Notification polling',
  ],

  dataEntities: [
    {
      name: 'PollState',
      runtime: true,
      singleton: true,
      fields: [
        { name: 'isPolling', type: 'boolean', default: false },
        { name: 'pollCount', type: 'number', default: 0 },
        { name: 'lastPollAt', type: 'number', default: null },
        { name: 'error', type: 'object', default: null },
      ],
    },
  ],

  stateMachine: {
    initial: 'Stopped',
    states: [
      { name: 'Stopped', isInitial: true },
      { name: 'Polling' },
      { name: 'Paused' },
    ],
    events: [
      { key: 'START' },
      { key: 'STOP' },
      { key: 'PAUSE' },
      { key: 'RESUME' },
      { key: 'POLL_TICK' },
      { key: 'POLL_SUCCESS' },
      { key: 'POLL_ERROR' },
    ],
    transitions: [
      {
        from: 'Stopped',
        to: 'Polling',
        event: 'START',
        effects: [
          ['set', '@entity.isPolling', true],
          ['set', '@entity.pollCount', 0],
          ['async/interval', '@config.intervalMs', ['emit', 'POLL_TICK']],
        ],
      },
      {
        from: 'Polling',
        event: 'POLL_TICK',
        guard: ['or', ['=', '@config.maxPolls', null], ['<', '@entity.pollCount', '@config.maxPolls']],
        effects: [
          ['set', '@entity.lastPollAt', ['time/now']],
        ],
      },
      {
        from: 'Polling',
        event: 'POLL_SUCCESS',
        effects: [
          ['set', '@entity.pollCount', ['+', '@entity.pollCount', 1]],
          ['set', '@entity.error', null],
        ],
      },
      {
        from: 'Polling',
        event: 'POLL_ERROR',
        effects: [
          ['set', '@entity.error', '@payload.error'],
          ['when', '@config.stopOnError', ['emit', 'STOP']],
        ],
      },
      {
        from: 'Polling',
        to: 'Paused',
        event: 'PAUSE',
        effects: [
          ['set', '@entity.isPolling', false],
        ],
      },
      {
        from: 'Paused',
        to: 'Polling',
        event: 'RESUME',
        effects: [
          ['set', '@entity.isPolling', true],
          ['async/interval', '@config.intervalMs', ['emit', 'POLL_TICK']],
        ],
      },
      {
        from: ['Polling', 'Paused'],
        to: 'Stopped',
        event: 'STOP',
        effects: [
          ['set', '@entity.isPolling', false],
        ],
      },
    ],
  },

  configSchema: {
    required: [],
    optional: [
      { name: 'intervalMs', type: 'number', description: 'Poll interval in ms', default: 5000 },
      { name: 'stopOnError', type: 'boolean', description: 'Stop polling on error', default: false },
      { name: 'maxPolls', type: 'number', description: 'Maximum poll count (null = infinite)', default: null },
    ],
  },
};

// ============================================================================
// Export All Async Behaviors
// ============================================================================

export const ASYNC_BEHAVIORS: StandardBehavior[] = [
  LOADING_BEHAVIOR,
  FETCH_BEHAVIOR,
  SUBMIT_BEHAVIOR,
  RETRY_BEHAVIOR,
  POLL_BEHAVIOR,
];
