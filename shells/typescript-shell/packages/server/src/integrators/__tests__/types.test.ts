/**
 * Integrator Types Tests
 *
 * Tests for type contracts and interface compliance.
 *
 * @packageDocumentation
 */

import { describe, it, expect } from 'vitest';
import type {
  EventBus,
  ActionParam,
  IntegratorAction,
  IntegratorCallbacks,
  IntegratorError,
  ExecutionContext,
  ServiceIntegrator,
} from '../types.js';

// ============================================================================
// EventBus Interface Tests
// ============================================================================

describe('EventBus Interface', () => {
  it('should allow implementing emit method', () => {
    const events: Array<{ event: string; payload?: unknown }> = [];

    const eventBus: EventBus = {
      emit: (event, payload) => {
        events.push({ event, payload });
      },
      on: () => () => {},
      once: () => {},
    };

    eventBus.emit('TEST_EVENT', { data: 'test' });

    expect(events).toHaveLength(1);
    expect(events[0].event).toBe('TEST_EVENT');
    expect(events[0].payload).toEqual({ data: 'test' });
  });

  it('should allow implementing on method with unsubscribe', () => {
    const handlers: Map<string, Array<(payload?: unknown) => void>> = new Map();

    const eventBus: EventBus = {
      emit: (event, payload) => {
        handlers.get(event)?.forEach((h) => h(payload));
      },
      on: (event, handler) => {
        if (!handlers.has(event)) handlers.set(event, []);
        handlers.get(event)!.push(handler);
        return () => {
          const arr = handlers.get(event);
          if (arr) {
            const idx = arr.indexOf(handler);
            if (idx > -1) arr.splice(idx, 1);
          }
        };
      },
      once: () => {},
    };

    let callCount = 0;
    const unsubscribe = eventBus.on('COUNT', () => callCount++);

    eventBus.emit('COUNT');
    expect(callCount).toBe(1);

    unsubscribe();
    eventBus.emit('COUNT');
    expect(callCount).toBe(1); // Should not increment after unsubscribe
  });

  it('should allow implementing once method', () => {
    let callCount = 0;

    const eventBus: EventBus = {
      emit: () => {},
      on: () => () => {},
      once: (_event, handler) => {
        // Simulate one-time execution
        callCount++;
        handler({ once: true });
      },
    };

    eventBus.once('SINGLE', () => {});
    expect(callCount).toBe(1);
  });
});

// ============================================================================
// ActionParam Tests
// ============================================================================

describe('ActionParam Interface', () => {
  it('should define required action parameters', () => {
    const param: ActionParam = {
      name: 'query',
      type: 'string',
      required: true,
    };

    expect(param.name).toBe('query');
    expect(param.type).toBe('string');
    expect(param.required).toBe(true);
  });

  it('should support optional fields', () => {
    const param: ActionParam = {
      name: 'maxResults',
      type: 'number',
      required: false,
      description: 'Maximum number of results',
      defaultValue: 10,
    };

    expect(param.description).toBe('Maximum number of results');
    expect(param.defaultValue).toBe(10);
  });

  it('should support all parameter types', () => {
    const types: ActionParam['type'][] = [
      'string',
      'number',
      'boolean',
      'object',
      'array',
    ];

    types.forEach((type) => {
      const param: ActionParam = { name: 'test', type, required: true };
      expect(param.type).toBe(type);
    });
  });
});

// ============================================================================
// IntegratorAction Tests
// ============================================================================

describe('IntegratorAction Interface', () => {
  it('should define action with params', () => {
    const action: IntegratorAction = {
      name: 'search',
      description: 'Search for videos',
      params: [
        { name: 'query', type: 'string', required: true },
        { name: 'maxResults', type: 'number', required: false },
      ],
    };

    expect(action.name).toBe('search');
    expect(action.params).toHaveLength(2);
    expect(action.params[0].name).toBe('query');
  });

  it('should support response shape', () => {
    const action: IntegratorAction = {
      name: 'getVideo',
      description: 'Get video details',
      params: [{ name: 'videoId', type: 'string', required: true }],
      responseShape: {
        title: 'string',
        description: 'string',
        viewCount: 'number',
      },
    };

    expect(action.responseShape).toBeDefined();
    expect(action.responseShape?.title).toBe('string');
  });
});

// ============================================================================
// IntegratorCallbacks Tests
// ============================================================================

describe('IntegratorCallbacks Interface', () => {
  it('should define success and error events', () => {
    const callbacks: IntegratorCallbacks = {
      onSuccess: 'SEARCH_COMPLETE',
      onError: 'SEARCH_FAILED',
    };

    expect(callbacks.onSuccess).toBe('SEARCH_COMPLETE');
    expect(callbacks.onError).toBe('SEARCH_FAILED');
  });
});

// ============================================================================
// IntegratorError Tests
// ============================================================================

describe('IntegratorError Interface', () => {
  it('should define error with code and message', () => {
    const error: IntegratorError = {
      code: 'API_ERROR',
      message: 'Failed to connect to API',
    };

    expect(error.code).toBe('API_ERROR');
    expect(error.message).toBe('Failed to connect to API');
  });

  it('should support optional details', () => {
    const error: IntegratorError = {
      code: 'VALIDATION_ERROR',
      message: 'Invalid parameters',
      details: { field: 'query', reason: 'required' },
    };

    expect(error.details).toEqual({ field: 'query', reason: 'required' });
  });
});

// ============================================================================
// ExecutionContext Tests
// ============================================================================

describe('ExecutionContext Interface', () => {
  it('should support timeout configuration', () => {
    const context: ExecutionContext = {
      timeout: 5000,
    };

    expect(context.timeout).toBe(5000);
  });

  it('should support retry configuration', () => {
    const context: ExecutionContext = {
      retry: {
        maxAttempts: 3,
        backoffMs: 1000,
      },
    };

    expect(context.retry?.maxAttempts).toBe(3);
    expect(context.retry?.backoffMs).toBe(1000);
  });

  it('should support metadata', () => {
    const context: ExecutionContext = {
      metadata: {
        userId: '123',
        requestId: 'abc-456',
      },
    };

    expect(context.metadata?.userId).toBe('123');
  });
});

// ============================================================================
// ServiceIntegrator Tests
// ============================================================================

describe('ServiceIntegrator Interface', () => {
  it('should allow implementing basic integrator', async () => {
    const emittedEvents: Array<{ event: string; payload?: unknown }> = [];

    const mockIntegrator: ServiceIntegrator = {
      name: 'mock',
      description: 'Mock integrator for testing',
      category: 'test',
      actions: [
        {
          name: 'ping',
          description: 'Ping test',
          params: [],
        },
      ],
      execute: async (_action, _params, eventBus, callbacks) => {
        eventBus.emit(callbacks.onSuccess, { pong: true });
      },
    };

    const eventBus: EventBus = {
      emit: (event, payload) => emittedEvents.push({ event, payload }),
      on: () => () => {},
      once: () => {},
    };

    await mockIntegrator.execute(
      'ping',
      {},
      eventBus,
      { onSuccess: 'PING_SUCCESS', onError: 'PING_FAILED' }
    );

    expect(emittedEvents).toHaveLength(1);
    expect(emittedEvents[0].event).toBe('PING_SUCCESS');
    expect(emittedEvents[0].payload).toEqual({ pong: true });
  });

  it('should allow implementing validateParams', () => {
    const mockIntegrator: ServiceIntegrator = {
      name: 'mock',
      description: 'Mock integrator',
      category: 'test',
      actions: [],
      execute: async () => {},
      validateParams: (action, params) => {
        if (action === 'search' && !params.query) {
          return { valid: false, errors: ['query is required'] };
        }
        return { valid: true };
      },
    };

    const validResult = mockIntegrator.validateParams!('search', { query: 'test' });
    expect(validResult.valid).toBe(true);

    const invalidResult = mockIntegrator.validateParams!('search', {});
    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.errors).toContain('query is required');
  });

  it('should allow implementing isConfigured', () => {
    const mockIntegrator: ServiceIntegrator = {
      name: 'mock',
      description: 'Mock integrator',
      category: 'test',
      actions: [],
      execute: async () => {},
      isConfigured: () => {
        return process.env.MOCK_API_KEY !== undefined;
      },
    };

    // Without env var, should return false
    const originalEnv = process.env.MOCK_API_KEY;
    delete process.env.MOCK_API_KEY;
    expect(mockIntegrator.isConfigured!()).toBe(false);

    // With env var, should return true
    process.env.MOCK_API_KEY = 'test-key';
    expect(mockIntegrator.isConfigured!()).toBe(true);

    // Cleanup
    if (originalEnv) {
      process.env.MOCK_API_KEY = originalEnv;
    } else {
      delete process.env.MOCK_API_KEY;
    }
  });

  it('should emit error on failure', async () => {
    const emittedEvents: Array<{ event: string; payload?: unknown }> = [];

    const failingIntegrator: ServiceIntegrator = {
      name: 'failing',
      description: 'Always fails',
      category: 'test',
      actions: [],
      execute: async (_action, _params, eventBus, callbacks) => {
        eventBus.emit(callbacks.onError, {
          code: 'ALWAYS_FAILS',
          message: 'This integrator always fails',
        });
      },
    };

    const eventBus: EventBus = {
      emit: (event, payload) => emittedEvents.push({ event, payload }),
      on: () => () => {},
      once: () => {},
    };

    await failingIntegrator.execute(
      'test',
      {},
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'FAILED' }
    );

    expect(emittedEvents).toHaveLength(1);
    expect(emittedEvents[0].event).toBe('FAILED');
    expect((emittedEvents[0].payload as IntegratorError).code).toBe('ALWAYS_FAILS');
  });
});
