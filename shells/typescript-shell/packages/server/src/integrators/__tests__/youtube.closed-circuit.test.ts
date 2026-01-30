/**
 * YouTube Integrator Closed Circuit Tests
 *
 * Tests for verifying the closed circuit pattern:
 * - Integrator ALWAYS emits events (never returns values)
 * - onSuccess emitted on successful operations
 * - onError emitted on failures
 *
 * @packageDocumentation
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { EventBus, IntegratorError } from '../types.js';
import { youtubeIntegrator } from '../youtube.js';
import {
  registerIntegrator,
  clearRegistry,
  executeIntegrator,
} from '../registry.js';

// ============================================================================
// Test Fixtures
// ============================================================================

function createMockEventBus(): EventBus & {
  emittedEvents: Array<{ event: string; payload?: unknown }>;
  getLastEvent: () => { event: string; payload?: unknown } | undefined;
  getEventsByName: (name: string) => Array<{ event: string; payload?: unknown }>;
} {
  const emittedEvents: Array<{ event: string; payload?: unknown }> = [];
  return {
    emittedEvents,
    emit: (event, payload) => emittedEvents.push({ event, payload }),
    on: () => () => {},
    once: () => {},
    getLastEvent: () => emittedEvents[emittedEvents.length - 1],
    getEventsByName: (name) => emittedEvents.filter((e) => e.event === name),
  };
}

// ============================================================================
// Setup / Teardown
// ============================================================================

beforeEach(() => {
  process.env.YOUTUBE_API_KEY = 'test-api-key';
  clearRegistry();
});

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.YOUTUBE_API_KEY;
  clearRegistry();
});

// ============================================================================
// Closed Circuit Pattern Tests
// ============================================================================

describe('Closed Circuit Pattern', () => {
  it('should ALWAYS emit an event (never return a value)', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ items: [] }),
      })
    );

    // The execute method should return void (Promise<void>)
    const result = await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'DONE', onError: 'FAIL' }
    );

    // Execute returns void, not the result
    expect(result).toBeUndefined();

    // But an event MUST have been emitted
    expect(eventBus.emittedEvents.length).toBeGreaterThan(0);
  });

  it('should emit exactly ONE event per execution', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ items: [] }),
      })
    );

    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'DONE', onError: 'FAIL' }
    );

    // Should emit exactly one event (either success OR error, not both)
    expect(eventBus.emittedEvents).toHaveLength(1);
  });

  it('should emit onSuccess event on successful API call', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            items: [
              {
                id: { videoId: 'test123' },
                snippet: {
                  title: 'Test',
                  description: 'Test',
                  thumbnails: {},
                  channelTitle: 'Test',
                  publishedAt: '2024-01-01',
                },
              },
            ],
          }),
      })
    );

    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'SEARCH_COMPLETE', onError: 'SEARCH_FAILED' }
    );

    expect(eventBus.getLastEvent()?.event).toBe('SEARCH_COMPLETE');
    expect(eventBus.getEventsByName('SEARCH_FAILED')).toHaveLength(0);
  });

  it('should emit onError event on API failure', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network error'))
    );

    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'SEARCH_COMPLETE', onError: 'SEARCH_FAILED' }
    );

    expect(eventBus.getLastEvent()?.event).toBe('SEARCH_FAILED');
    expect(eventBus.getEventsByName('SEARCH_COMPLETE')).toHaveLength(0);
  });

  it('should emit custom event names from callbacks', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ items: [] }),
      })
    );

    // Custom event names
    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'CUSTOM_SUCCESS_EVENT', onError: 'CUSTOM_ERROR_EVENT' }
    );

    expect(eventBus.getLastEvent()?.event).toBe('CUSTOM_SUCCESS_EVENT');
  });
});

// ============================================================================
// Event Payload Tests
// ============================================================================

describe('Event Payloads', () => {
  it('should include result data in success payload', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            items: [
              {
                id: { videoId: 'video123' },
                snippet: {
                  title: 'My Video',
                  description: 'Description',
                  thumbnails: { medium: { url: 'http://thumb.jpg' } },
                  channelTitle: 'Channel',
                  publishedAt: '2024-01-01',
                },
              },
            ],
          }),
      })
    );

    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    const payload = eventBus.getLastEvent()?.payload as any[];
    expect(payload).toBeDefined();
    expect(payload[0].videoId).toBe('video123');
    expect(payload[0].title).toBe('My Video');
  });

  it('should include error details in error payload', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('API quota exceeded'))
    );

    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    const payload = eventBus.getLastEvent()?.payload as IntegratorError;
    expect(payload).toBeDefined();
    expect(payload.code).toBeDefined();
    expect(payload.message).toContain('API quota exceeded');
  });

  it('should have IntegratorError structure on error', async () => {
    const eventBus = createMockEventBus();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Some error'))
    );

    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'SUCCESS', onError: 'ERROR' }
    );

    const payload = eventBus.getLastEvent()?.payload as IntegratorError;

    // Should conform to IntegratorError interface
    expect(typeof payload.code).toBe('string');
    expect(typeof payload.message).toBe('string');
    // details is optional
  });
});

// ============================================================================
// Registry Integration Tests
// ============================================================================

describe('Registry Closed Circuit', () => {
  it('should emit via executeIntegrator helper', async () => {
    const eventBus = createMockEventBus();

    // Register the integrator
    registerIntegrator(youtubeIntegrator, true);

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ items: [] }),
      })
    );

    await executeIntegrator(
      'youtube',
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'DONE', onError: 'FAIL' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.getLastEvent()?.event).toBe('DONE');
  });

  it('should emit INTEGRATOR_NOT_FOUND for unknown service', async () => {
    const eventBus = createMockEventBus();

    await executeIntegrator(
      'unknown-service',
      'action',
      {},
      eventBus,
      { onSuccess: 'DONE', onError: 'FAIL' }
    );

    expect(eventBus.emittedEvents).toHaveLength(1);
    expect(eventBus.getLastEvent()?.event).toBe('FAIL');

    const payload = eventBus.getLastEvent()?.payload as IntegratorError;
    expect(payload.code).toBe('INTEGRATOR_NOT_FOUND');
  });
});

// ============================================================================
// Trait Simulation Tests
// ============================================================================

describe('Trait Event Flow Simulation', () => {
  /**
   * Simulates how a trait would use the integrator:
   *
   * 1. Trait receives UI event (e.g., SEARCH button clicked)
   * 2. Trait transition calls integrator
   * 3. Integrator emits result event
   * 4. Trait receives result event and updates state
   */
  it('should complete full search flow', async () => {
    const eventBus = createMockEventBus();
    const stateUpdates: string[] = [];

    // Simulate trait listening for result
    const handlers: Record<string, (payload?: unknown) => void> = {};

    // Override on to capture handlers
    eventBus.on = (event, handler) => {
      handlers[event] = handler;
      return () => {
        delete handlers[event];
      };
    };

    // Register handlers like a trait would
    eventBus.on('SEARCH_COMPLETE', (payload) => {
      stateUpdates.push(`Received ${(payload as any[]).length} results`);
    });

    eventBus.on('SEARCH_FAILED', (payload) => {
      stateUpdates.push(`Error: ${(payload as IntegratorError).message}`);
    });

    // Mock successful API
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            items: [
              {
                id: { videoId: 'v1' },
                snippet: {
                  title: 'Result 1',
                  description: '',
                  thumbnails: {},
                  channelTitle: '',
                  publishedAt: '',
                },
              },
              {
                id: { videoId: 'v2' },
                snippet: {
                  title: 'Result 2',
                  description: '',
                  thumbnails: {},
                  channelTitle: '',
                  publishedAt: '',
                },
              },
            ],
          }),
      })
    );

    // Step 1: Trait calls integrator (like in a transition effect)
    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'SEARCH_COMPLETE', onError: 'SEARCH_FAILED' }
    );

    // Step 2: Manually trigger handler (simulating event bus dispatch)
    const lastEvent = eventBus.getLastEvent();
    if (lastEvent && handlers[lastEvent.event]) {
      handlers[lastEvent.event](lastEvent.payload);
    }

    // Step 3: Verify trait received the event
    expect(stateUpdates).toContain('Received 2 results');
  });

  it('should complete full error flow', async () => {
    const eventBus = createMockEventBus();
    const stateUpdates: string[] = [];

    const handlers: Record<string, (payload?: unknown) => void> = {};
    eventBus.on = (event, handler) => {
      handlers[event] = handler;
      return () => {
        delete handlers[event];
      };
    };

    eventBus.on('SEARCH_COMPLETE', () => {
      stateUpdates.push('Success');
    });

    eventBus.on('SEARCH_FAILED', (payload) => {
      stateUpdates.push(`Failed: ${(payload as IntegratorError).code}`);
    });

    // Mock failed API
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network timeout'))
    );

    await youtubeIntegrator.execute(
      'search',
      { query: 'test' },
      eventBus,
      { onSuccess: 'SEARCH_COMPLETE', onError: 'SEARCH_FAILED' }
    );

    const lastEvent = eventBus.getLastEvent();
    if (lastEvent && handlers[lastEvent.event]) {
      handlers[lastEvent.event](lastEvent.payload);
    }

    expect(stateUpdates.some((s) => s.startsWith('Failed:'))).toBe(true);
    expect(stateUpdates).not.toContain('Success');
  });
});
