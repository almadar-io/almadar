/**
 * Integrator Registry Tests
 *
 * Tests for integrator registration, lookup, and execution.
 *
 * @packageDocumentation
 */

import { describe, it, expect, beforeEach } from 'vitest';
import type { ServiceIntegrator, EventBus } from '../types.js';
import {
  registerIntegrator,
  unregisterIntegrator,
  clearRegistry,
  getIntegrator,
  hasIntegrator,
  getIntegratorEntry,
  listIntegrators,
  listIntegratorsByCategory,
  getAllIntegrators,
  getIntegratorCount,
  integratorRegistry,
  executeIntegrator,
} from '../registry.js';

// ============================================================================
// Test Fixtures
// ============================================================================

function createMockIntegrator(
  name: string,
  category: string = 'test'
): ServiceIntegrator {
  return {
    name,
    description: `Mock ${name} integrator`,
    category,
    actions: [
      {
        name: 'testAction',
        description: 'Test action',
        params: [{ name: 'param1', type: 'string', required: true }],
      },
    ],
    execute: async (_action, _params, eventBus, callbacks) => {
      eventBus.emit(callbacks.onSuccess, { result: 'success' });
    },
  };
}

function createMockEventBus(): EventBus & {
  emittedEvents: Array<{ event: string; payload?: unknown }>;
} {
  const emittedEvents: Array<{ event: string; payload?: unknown }> = [];
  return {
    emittedEvents,
    emit: (event, payload) => emittedEvents.push({ event, payload }),
    on: () => () => {},
    once: () => {},
  };
}

// ============================================================================
// Setup
// ============================================================================

beforeEach(() => {
  clearRegistry();
});

// ============================================================================
// Registration Tests
// ============================================================================

describe('Integrator Registration', () => {
  it('should register an integrator', () => {
    const integrator = createMockIntegrator('test-integrator');
    registerIntegrator(integrator);

    expect(hasIntegrator('test-integrator')).toBe(true);
    expect(getIntegratorCount()).toBe(1);
  });

  it('should register multiple integrators', () => {
    registerIntegrator(createMockIntegrator('integrator1'));
    registerIntegrator(createMockIntegrator('integrator2'));
    registerIntegrator(createMockIntegrator('integrator3'));

    expect(getIntegratorCount()).toBe(3);
  });

  it('should throw when registering duplicate integrator', () => {
    registerIntegrator(createMockIntegrator('duplicate'));

    expect(() => {
      registerIntegrator(createMockIntegrator('duplicate'));
    }).toThrow('Integrator "duplicate" is already registered');
  });

  it('should track built-in status', () => {
    registerIntegrator(createMockIntegrator('builtin'), true);
    registerIntegrator(createMockIntegrator('custom'), false);

    const builtinEntry = getIntegratorEntry('builtin');
    const customEntry = getIntegratorEntry('custom');

    expect(builtinEntry?.builtIn).toBe(true);
    expect(customEntry?.builtIn).toBe(false);
  });

  it('should record registration timestamp', () => {
    const before = new Date();
    registerIntegrator(createMockIntegrator('timestamped'));
    const after = new Date();

    const entry = getIntegratorEntry('timestamped');
    expect(entry?.registeredAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(entry?.registeredAt.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});

// ============================================================================
// Lookup Tests
// ============================================================================

describe('Integrator Lookup', () => {
  it('should get integrator by name', () => {
    const integrator = createMockIntegrator('lookup-test');
    registerIntegrator(integrator);

    const retrieved = getIntegrator('lookup-test');
    expect(retrieved).toBe(integrator);
  });

  it('should return undefined for non-existent integrator', () => {
    const retrieved = getIntegrator('non-existent');
    expect(retrieved).toBeUndefined();
  });

  it('should check integrator existence', () => {
    registerIntegrator(createMockIntegrator('exists'));

    expect(hasIntegrator('exists')).toBe(true);
    expect(hasIntegrator('does-not-exist')).toBe(false);
  });

  it('should get entry with metadata', () => {
    registerIntegrator(createMockIntegrator('with-meta'), true);

    const entry = getIntegratorEntry('with-meta');
    expect(entry).toBeDefined();
    expect(entry?.integrator.name).toBe('with-meta');
    expect(entry?.builtIn).toBe(true);
    expect(entry?.registeredAt).toBeInstanceOf(Date);
  });
});

// ============================================================================
// Listing Tests
// ============================================================================

describe('Integrator Listing', () => {
  beforeEach(() => {
    registerIntegrator(createMockIntegrator('youtube', 'media'));
    registerIntegrator(createMockIntegrator('vimeo', 'media'));
    registerIntegrator(createMockIntegrator('stripe', 'payment'));
    registerIntegrator(createMockIntegrator('twilio', 'messaging'));
  });

  it('should list all integrator names', () => {
    const names = listIntegrators();

    expect(names).toHaveLength(4);
    expect(names).toContain('youtube');
    expect(names).toContain('stripe');
    expect(names).toContain('twilio');
  });

  it('should list integrators by category', () => {
    const mediaIntegrators = listIntegratorsByCategory('media');

    expect(mediaIntegrators).toHaveLength(2);
    expect(mediaIntegrators.map((i) => i.name)).toContain('youtube');
    expect(mediaIntegrators.map((i) => i.name)).toContain('vimeo');
  });

  it('should return empty array for unknown category', () => {
    const unknownCategory = listIntegratorsByCategory('unknown');
    expect(unknownCategory).toHaveLength(0);
  });

  it('should get all integrators', () => {
    const all = getAllIntegrators();

    expect(all).toHaveLength(4);
    expect(all.every((i) => i.name && i.category)).toBe(true);
  });

  it('should get integrator count', () => {
    expect(getIntegratorCount()).toBe(4);
  });
});

// ============================================================================
// Unregistration Tests
// ============================================================================

describe('Integrator Unregistration', () => {
  it('should unregister an integrator', () => {
    registerIntegrator(createMockIntegrator('to-remove'));
    expect(hasIntegrator('to-remove')).toBe(true);

    const result = unregisterIntegrator('to-remove');
    expect(result).toBe(true);
    expect(hasIntegrator('to-remove')).toBe(false);
  });

  it('should return false when unregistering non-existent', () => {
    const result = unregisterIntegrator('non-existent');
    expect(result).toBe(false);
  });

  it('should clear all integrators', () => {
    registerIntegrator(createMockIntegrator('one'));
    registerIntegrator(createMockIntegrator('two'));
    registerIntegrator(createMockIntegrator('three'));

    expect(getIntegratorCount()).toBe(3);

    clearRegistry();

    expect(getIntegratorCount()).toBe(0);
    expect(listIntegrators()).toHaveLength(0);
  });
});

// ============================================================================
// Registry Object Interface Tests
// ============================================================================

describe('Registry Object Interface', () => {
  it('should expose register method', () => {
    integratorRegistry.register(createMockIntegrator('obj-test'));
    expect(integratorRegistry.has('obj-test')).toBe(true);
  });

  it('should expose get method', () => {
    integratorRegistry.register(createMockIntegrator('obj-get'));
    const integrator = integratorRegistry.get('obj-get');
    expect(integrator?.name).toBe('obj-get');
  });

  it('should expose list method', () => {
    integratorRegistry.register(createMockIntegrator('list1'));
    integratorRegistry.register(createMockIntegrator('list2'));

    const names = integratorRegistry.list();
    expect(names).toContain('list1');
    expect(names).toContain('list2');
  });

  it('should expose listByCategory method', () => {
    integratorRegistry.register(createMockIntegrator('cat1', 'catA'));
    integratorRegistry.register(createMockIntegrator('cat2', 'catA'));

    const integrators = integratorRegistry.listByCategory('catA');
    expect(integrators).toHaveLength(2);
  });

  it('should expose getAll method', () => {
    integratorRegistry.register(createMockIntegrator('all1'));
    integratorRegistry.register(createMockIntegrator('all2'));

    const all = integratorRegistry.getAll();
    expect(all).toHaveLength(2);
  });
});

// ============================================================================
// Execution Helper Tests
// ============================================================================

describe('executeIntegrator Helper', () => {
  it('should execute registered integrator', async () => {
    registerIntegrator(createMockIntegrator('exec-test'));
    const eventBus = createMockEventBus();

    await executeIntegrator(
      'exec-test',
      'testAction',
      { param1: 'value' },
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('SUCCESS');
  });

  it('should emit error for non-existent integrator', async () => {
    const eventBus = createMockEventBus();

    await executeIntegrator(
      'non-existent',
      'action',
      {},
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('ERROR');
    expect((eventBus.emittedEvents[0].payload as any).code).toBe('INTEGRATOR_NOT_FOUND');
  });

  it('should validate params if integrator supports it', async () => {
    const integratorWithValidation: ServiceIntegrator = {
      ...createMockIntegrator('with-validation'),
      validateParams: (_action, params) => {
        if (!params.required) {
          return { valid: false, errors: ['required param missing'] };
        }
        return { valid: true };
      },
    };
    registerIntegrator(integratorWithValidation);

    const eventBus = createMockEventBus();

    await executeIntegrator(
      'with-validation',
      'action',
      {}, // Missing required param
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('ERROR');
    expect((eventBus.emittedEvents[0].payload as any).code).toBe('VALIDATION_ERROR');
  });

  it('should check configuration if integrator supports it', async () => {
    const unconfiguredIntegrator: ServiceIntegrator = {
      ...createMockIntegrator('unconfigured'),
      isConfigured: () => false,
    };
    registerIntegrator(unconfiguredIntegrator);

    const eventBus = createMockEventBus();

    await executeIntegrator(
      'unconfigured',
      'action',
      {},
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('ERROR');
    expect((eventBus.emittedEvents[0].payload as any).code).toBe('NOT_CONFIGURED');
  });

  it('should execute when properly configured', async () => {
    const configuredIntegrator: ServiceIntegrator = {
      ...createMockIntegrator('configured'),
      isConfigured: () => true,
      validateParams: () => ({ valid: true }),
    };
    registerIntegrator(configuredIntegrator);

    const eventBus = createMockEventBus();

    await executeIntegrator(
      'configured',
      'testAction',
      { param1: 'value' },
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.emittedEvents[0].event).toBe('SUCCESS');
  });
});

// ============================================================================
// Edge Cases
// ============================================================================

describe('Edge Cases', () => {
  it('should handle empty registry', () => {
    expect(listIntegrators()).toHaveLength(0);
    expect(getAllIntegrators()).toHaveLength(0);
    expect(getIntegratorCount()).toBe(0);
  });

  it('should handle special characters in integrator names', () => {
    registerIntegrator(createMockIntegrator('my-integrator'));
    registerIntegrator(createMockIntegrator('my_integrator'));
    registerIntegrator(createMockIntegrator('myIntegrator'));

    expect(hasIntegrator('my-integrator')).toBe(true);
    expect(hasIntegrator('my_integrator')).toBe(true);
    expect(hasIntegrator('myIntegrator')).toBe(true);
  });

  it('should maintain insertion order in listing', () => {
    registerIntegrator(createMockIntegrator('first'));
    registerIntegrator(createMockIntegrator('second'));
    registerIntegrator(createMockIntegrator('third'));

    const names = listIntegrators();
    expect(names[0]).toBe('first');
    expect(names[1]).toBe('second');
    expect(names[2]).toBe('third');
  });
});
